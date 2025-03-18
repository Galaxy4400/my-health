<?php
//=================================================================
//                      DATABASE CONNECTION
//=================================================================

//*****************************************************************
//                       Abante CMS Module
//
//           (C) Webis Group 2002-2022. All rights reserved.
//
//                    contact@webisgroup.ru
//                  http://www.webisgroup.ru
//                  http://cms.webisgroup.ru
//*****************************************************************

$ignore_tables=array("sessions", "Users", "Cart", "Subscribers", "mailingStatus", "Mailing", "Banners", "Settings", "SettingsCategories", "SystemUsers", "SystemPermissions", "Orders");

function need_update_db($query) {
	//echo($query."<br>");
	global $ignore_tables;
	$result = true;
	$qu = strtoupper($query);
	if(strpos($qu, "SELECT")==1||strpos($qu, "OPTIMIZE")==1||strpos($qu, "DESC")==1||strpos($qu, "SHOW")==1) $result = false;
	else for ($i=0; $i<count($ignore_tables); $i++) {
		$it = $ignore_tables[$i];
		if(strstr($qu, strtoupper("update ".$it))) $result = false;
		if(strstr($qu, strtoupper("insert into ".$it))) $result = false;
		if(strstr($qu, strtoupper("delete from ".$it))) $result = false;
	}
	//echo("Result=".$result."<hr>");
	return $result;
}

  DEFINE ("base64_enabled", false);
  class CDatabase{
    var $ms;

    function CDatabase($db_Hostname = '', $db_UserName = '', $db_Password = '', $db_Database = '') {
      if($db_Hostname == '') $db_Hostname = MYSQL_HOST;
      if($db_UserName == '') $db_UserName = MYSQL_USER;
      if($db_Password == '') $db_Password = MYSQL_PASSWORD;
      if($db_Database == '') $db_Database = MYSQL_DB;

      $this->ms = mysql_connect($db_Hostname, $db_UserName, $db_Password) or die ("Cannot connect to MySQL server <b>".$db_Hostname."</b>!<hr>".mysql_error());
      mysql_select_db($db_Database, $this->ms) or die("Cannot connect to database!");
      mysql_query("set names utf8", $this->ms) or die("Cannot change encoding!");
    }

    function close(){
      mysql_close($this->ms);
    }

	function protectXSS($value) {
		return htmlspecialchars($value);
	}

    function query($query, $update_last = true){
      global $qd;
      $query=" ".trim($query);

      $res=mysql_query($query, $this->ms) or die ("Invalid query: <b>$query</b><br><i>".mysql_error($this->ms)."</i>");

      $ps = strpos(strtoupper($query), 'INSERT');
      if ($ps==1) $res = mysql_insert_id($this->ms);
      if(need_update_db($query)&&$update_last) mysql_query("update last_update set dt='".timeStr()."'", $this->ms);

      return $res;
    }

    function getData($query, $cache=false){
    	global $qd;
    	
      $last_modified = 0;
      $cache = false;

    	if($qd>0) echo("<hr>$query<br>");
    	if($qd>0) $tm = microtime_float();
    	if($cache) {
      		$filename = dir_prefix."tmp/sql_".md5($query).md5(strlen($query)).".php";
      		if($qd>0) echo ("<br><i>cache = ".$filename."; lm=$last_modified; lu=".last_update.")</i><br>");
      		include($filename);
      	}

      	if($cache&&$last_modified>=last_update) { // return PHP contents
      		if($qd>0) echo("got cached result!<br>");
      	} else {
      		if($qd>0) echo("No cache<br>");
      		$res = $this->query($query);

		$phpStr = "<?
$"."last_modified=".time().";

unset($"."result);
";
      		unset($result);
      		while($r=mysql_fetch_array($res)){
      			$phpStr.="
unset($"."rr);
";
		        unset($rr);
	        	foreach($r as $key => $value){
	          		$value = stripslashes($value);
          			if(base64_enabled) $value = base64_decode($value);
          			//echo("rr['$key']=$value<br>");
          			if(!is_numeric($key)) {
          				$phpStr.="$"."rr[\"".$key."\"] = stripslashes(\"".addslashes($value)."\");
";
          				$rr[$key] = $value;
          			}
        		}
        		$phpStr.="
$"."result[]=$"."rr;
";
        		$result[] = $rr;
      		}
      		$phpStr.="
?>";
		if($cache) {
			$fl = fopen($filename, "w");
			fwrite($fl, $phpStr);
			fclose($fl);
			chmod($filename, 0666);
		}
      	}
      	if($qd>0) echo("Query run: <b>".(microtime_float()-$tm)." s.</b><hr>");
      	return $result;
    }

    function insert($tblname, $display_only=false){
      $res = $this->query("desc ".$tblname);
      $varNameStr = '';
      $varValStr = '';
      while ($r=mysql_fetch_array($res)){
        $__nm=$r[0];
        if($__nm!="__id"&&$__nm!="__owner_id"&&$__nm!="__md5"&&$__nm!="ID"){
          global $$__nm;
          $value = $$__nm;
          if(isset($value)&&$value!="<#none#>"){
            $value = $this->escape($value);
            if(base64_enabled) $value = base64_encode($value);
            $varNameStr .= $__nm.", ";
            if(is_string($value)) $varValStr .= "'".$value."', ";
            else $varValStr .= $value.", ";
          }
        }
      }
      $varValStr = substr($varValStr, 0, strlen($varValStr)-2);
      $varNameStr = substr($varNameStr, 0, strlen($varNameStr)-2);
      $query = "insert into ".$tblname." (".$varNameStr.") values (".$varValStr.")";
      //echo $query;
      if(!$display_only) return $this->query($query);
      else return $query;
    }

    function my_insert($tblname, $data){
      $res = $this->query("desc ".$tblname);
      $varNameStr = '';
      $varValStr = '';
      while ($r=mysql_fetch_array($res)){
        $__nm=$r[0];
        if($__nm!="__id"&&$__nm!="__owner_id"&&$__nm!="__md5"&&$__nm!="ID"){
          $value = $data[$__nm];
          if(isset($value)&&$value!="<#none#>"){
            $value = $this->escape($value);
            if(base64_enabled) $value = base64_encode($value);
            $varNameStr .= $__nm.", ";
            if(is_string($value)) $varValStr .= "'".$value."', ";
            else $varValStr .= $value.", ";
          }
        }
      }
      $varValStr = substr($varValStr, 0, strlen($varValStr)-2);
      $varNameStr = substr($varNameStr, 0, strlen($varNameStr)-2);
      $query = "insert into ".$tblname." (".$varNameStr.") values (".$varValStr.")";
      //echo $query;
      if(!$display_only) return $this->query($query);
      else return $query;
    }
    function update($tblname, $condition){
      $res = $this->query("desc ".$tblname);
      $updateStr = '';
      while ($r=mysql_fetch_array($res)){
        $__nm=$r[0];
        if($__nm!="__id"&&$__nm!="__owner_id"&&$__nm!="__md5"&&$__nm!="ID"){
          global $$__nm;
          $value = $$__nm;
          //echo("var=$__nm; value=$value<br>");
          if(isset($value)&&$value!="<#none#>"){
            $value = $this->escape($value);
            if(base64_enabled) $value = base64_encode($value);
            $varNameStr = $__nm;
            if(is_string($value)) $varValStr = "'".$value."'";
            else $varValStr = $value;
            $updateStr.=$varNameStr."=".$varValStr.", ";
          }
        }
      }
      $updateStr = substr($updateStr, 0, strlen($updateStr)-2);
      $query = "update ".$tblname." set ".$updateStr." where ".$condition;
      // echo();
      return $this->query($query);
    }

    function my_update($tblname, $condition, $data){
      $res = $this->query("desc ".$tblname);
      
      $updateStr = '';
      while ($r=mysql_fetch_array($res)){
        $__nm=$r[0];
        if($__nm!="__id"&&$__nm!="__owner_id"&&$__nm!="__md5"&&$__nm!="ID"){
          global $$__nm;
          $value = $data[$__nm];
          if(isset($value)&&$value!="<#none#>"){
            $value = $this->escape($value);
            if(base64_enabled) $value = base64_encode($value);
            $varNameStr = $__nm;
            if(is_string($value)) $varValStr = "'".$value."'";
            else $varValStr = $value;
            $updateStr.=$varNameStr."=".$varValStr.", ";
          }
        }
      }
      $updateStr = substr($updateStr, 0, strlen($updateStr)-2);
      $query = "update ".$tblname." set ".$updateStr." where ".$condition;
      // echo();
      return $this->query($query);
    }
	
	function escape($string) {
		return mysql_real_escape_string($string, $this->ms);
	}
	
  }