<?php

//===================================================================================

function microtime_float()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

//===================================================================================


function my_array_merge($arr1, $arr2){
	global $menudebug;
	unset($res);
	if(count($arr1)<1) $res = $arr2;
	else if (count($arr2)<1) $res = $arr1;
	else $res = array_merge($arr1, $arr2);

	if($menudebug==1) {
		echo("my_array_merge($arr1, $arr2)<br>");
		echo("<b>array 1:</b><br>");
		print_r($arr1);
		echo("<br><b>array 2:</b>");
		print_r($arr2);
		echo("<br><b>result:</b>");
		print_r($res);
	}
	return $res;
}

//===================================================================================

function protectPath($path) {
	$path = str_replace("../", "", $path);
	$path = str_replace(chr(0), "", $path);
	$path = str_replace("\n", "", $path);
	return $path;
}

//===================================================================================

function getURL($url){
	set_time_limit(60);

	global $wdebug;

	$handle = fopen ($url, "r");
	$contents = "";
	do {
		$data = fread($handle, 256);
		//if($wdebug>0) echo("D=".htmlspecialchars($data)."<br><br>");
		if (strlen($data) == 0) break;
		$contents .= $data;
	} while(true);
	fclose ($handle);
	return $contents;
}

//===================================================================================

function translit($st){
  $q1 = "\"";
  $q2 = "'";
  $bs = "\\";
  //die("q1=$q1; q2=$q2; bs=$bs");
  $st0 = $st;
  //$st = mb_convert_encoding($st, "cp1251", "utf8");
  $transtable = array(
        'А' => 'A',
        'Б' => 'B',
        'В' => 'V',
        'Г' => 'G',
        'Д' => 'D',
        'Е' => 'E',
        'Ё' => 'Yo',
        'Ж' => 'Zh',
        'З' => 'Z',
        'И' => 'I',
        'Й' => 'Y',
        'К' => 'K',
        'Л' => 'L',
        'М' => 'M',
        'Н' => 'N',
        'О' => 'O',
        'П' => 'P',
        'Р' => 'R',
        'С' => 'S',
        'Т' => 'T',
        'У' => 'U',
        'Ф' => 'F',
        'Х' => 'H',
        'Ц' => 'Ts',
        'Ч' => 'Ch',
        'Ш' => 'Sh',
        'Щ' => 'Shch',
        'Ъ' => '',
        'Ы' => 'I',
        'Ь' => '',
        'Э' => 'E',
        'Ю' => 'Yu',
        'Я' => 'Ya',
        'а' => 'a',
        'б' => 'b',
        'в' => 'v',
        'г' => 'g',
        'д' => 'd',
        'е' => 'e',
        'ё' => 'yo',
        'ж' => 'zh',
        'з' => 'z',
        'и' => 'i',
        'й' => 'y',
        'к' => 'k',
        'л' => 'l',
        'м' => 'm',
        'н' => 'n',
        'о' => 'o',
        'п' => 'p',
        'р' => 'r',
        'с' => 's',
        'т' => 't',
        'у' => 'u',
        'ф' => 'f',
        'х' => 'h',
        'ц' => 'ts',
        'ч' => 'ch',
        'ш' => 'sh',
        'щ' => 'shch',
        'ъ' => '',
        'ы' => 'i',
        'ь' => '',
        'э' => 'e',
        'ю' => 'yu',
        'я' => 'ya',
        ' ' => '-',
		'№' => 'no.',
		'#' => 'no.',
		'"' => '',
		'/' => '_',
		'\'' => '\'',
		'\\' => ''
        );
  $st = strtr($st, $transtable);

  return $st;
}

//===================================================================================

function utf8_pathinfo($filename) {
	$filename_prefix = "__utf8_pathinfo__";
	$ps = strrpos($filename, "/");
	if($ps===false) $ps = strrpos($filename, "\\");
	if($ps>0) {
		$dir = substr($filename, 0, $ps);
		$fname = substr($filename, $ps+1, strlen($filename));
		$filename = $dir."/".$filename_prefix.$fname;
	} else $filename = $filename_prefix.$filename;

	$filename = mb_convert_encoding($filename, "cp1251", "utf8");
	$pi = pathinfo($filename);
	foreach($pi as $key=>$value) {
		$pi[$key] = mb_convert_encoding($value, "utf8", "cp1251");
		if($key=="basename"||$key=="filename") $pi[$key] = str_replace($filename_prefix, "", $pi[$key]);
	}
	return $pi;
}


//===================================================================================

function getSystemVariable($db, $code, $tpl=null, $nl2br=true, $is_array=false){
	global $system_vars;
	if(!is_object($db)) $db = new CDatabase();
	if(!isset($system_vars)) {
		$res = $db->getData("SELECT * FROM Settings");
		foreach($res as $val) {
			$system_vars[$val['Code']] = $val['Value'];
		}
	}

	$res = ($nl2br && !$is_array) ? nl2br($system_vars[$code]) : $system_vars[$code];
	if($tpl) $res = parseTemplate($res, $tpl);
	if($is_array){
		$res = explode("\n", $res);
	}
	return $res;
}

//===================================================================================

function getTextBetween(&$where, $open, $close, $include=false) {
	$ps1 = strpos($where, $open);
	if($ps1||$ps1===0) {
		$ps2 = strpos($where, $close, $ps1+strlen($open));
		if($ps2) {
			if($include) {
				$start = $ps1;
				$length = $ps2-$ps1+strlen($close);
			} else {
				$start = $ps1+strlen($open);
				$length = $ps2-$ps1-strlen($open);
			}
			$result = substr($where, $start, $length);
			return $result;
		} else return "";
	} else return "";
}

//===================================================================================

function populateFromDB($results, $is_list=false, $counter_offset=0, $bgcolor1="#ffffff", $bgcolor2="#f2f2f2", $nl2br = false){
	unset($res);
	$count = 1+$counter_offset;
	$bgcolor = $bgcolor1;
	for ($i=0; $i<count($results); $i++){
		unset($r);
		$r = $results[$i];
		$r['bgcolor'] = $bgcolor;
		$r['no'] = $count;
		$count++;
		if($bgcolor==$bgcolor1) $bgcolor = $bgcolor2;
		else $bgcolor = $bgcolor1;
		if($nl2br) {
			foreach($r as $key=>$value) {
				$r[$key] = nl2br($value);
			}
		}
		$res[] = $r;
	}
	if(!$is_list) $res = $res[0];
	return $res;
}

//===================================================================================

function populateFromPost($add = ""){
	unset($res);
	global $_POST;
	foreach($_POST as $key=>$value){
		$res[$key] = $add.$value;
	}
	return $res;
}

//===================================================================================

function timeStr($time = ''){
	if ($time=='') $time=time();
	$CurrentDate = getdate($time);
	$Year = $CurrentDate['year'];
	$Month = $CurrentDate['mon'];
	if($Month<10) $Month = "0".$Month;
	$Day = $CurrentDate['mday'];
	if($Day<10) $Day = "0".$Day;

	$HH = $CurrentDate['hours'];
	if($HH<10) $HH = "0".$HH;
	$MM = $CurrentDate['minutes'];
	if($MM<10) $MM = "0".$MM;
	$SS = $CurrentDate['seconds'];
	if($SS<10) $SS = "0".$SS;
	$DateTime = $Year."-".$Month."-".$Day." ".$HH.":".$MM.":".$SS;
	return $DateTime;
}

//===================================================================================

function displayError ($errorMsg, $backTo="javascript:history.back(1)", $is_small='0'){
	global $ses, $db;
	unset($ent);
	$ent['session'] = $ses->id;
	$ent['errorMSG'] = $errorMsg;
	if(!$backTo) {
		$ent['c1'] = "<!--";
		$ent['c2'] = "-->";
	} else {
		$ent['backTo'] = $backTo;
		$ent['c1'] = "";
		$ent['c2'] = "";
	}
	$ent['siteName'] = getSystemVariable($db, "admin_title");
	if($is_small=='0') echo ParseTemplate(TplFromFile(TEMPLATES_DIR.TPL_ERROR), $ent);
	else echo ParseTemplate(TplFromFile(TEMPLATES_DIR."error_sm.htm"), $ent);
	die;
}

//===================================================================================

function displaySystemMessage ($message){
	global $ses, $db;
	unset($ent);
	$ent['message'] = $message;
	echo ParseTemplate(TplFromFile(TEMPLATES_DIR."message.htm"), $ent);
	die;
}

//===================================================================================

function MySQLtimestamp2unix($stamp){
		return strtotime($stamp);
}

//===================================================================================

function fmtDate($timestamp, $inc_time = true) {
	if($inc_time) $FormatDate = date("d.m.Y H:i", mySQLtimestamp2unix($timestamp));
	else $FormatDate = date("d.m.Y", mySQLtimestamp2unix($timestamp));
	return $FormatDate;
}

//===================================================================================

function br2nl($what) {
	$n = "\n";
	$r = "\r";
	$what = str_replace("<br />\r", "<br />", $what);
	$what = str_replace("<br />\n", "<br />", $what);
	$what = eregi_replace("<br[^>]*>", $n, $what);
	return $what;
}

//===================================================================================

function getVisitorRealIP() {
	if($_SERVER['HTTP_X_FORWARDED_FOR']!="") return $_SERVER['HTTP_X_FORWARDED_FOR'];
	else return $_SERVER['REMOTE_ADDR'];
}

//===================================================================================

function getDropdownArray($arr, $selected= "", $type = "key"){
	foreach ($arr as $key => $val) {
		unset($c);
		if($selected!="" && $key == $selected && $type == "key")
			$c['selected'] = "selected";
		elseif ($selected!="" && $val == $selected && $type == "val")
			$c['selected'] = "selected";
		elseif ((count($selected) > 0) && $type == "multiple")	{
			foreach ($selected as $keySelect => $valSelect) {
				if ($val == $valSelect) $c['selected'] = "selected";
			}
		}
		$c['id'] = $key;
		$c['name'] = $val;
		$cats[] = $c;
	}
	return $cats;
}
//===================================================================================

foreach($_REQUEST as $key=>$value) {
	global $$key;
	$$key = $value;
}

foreach($_COOKIE as $key=>$value) {
	global $$key;
	$$key = $value;
}
