<?
header("Content-type: text/html; charset=utf-8");
require("include/defs.php");
require("include/dbconnect.php");
$db = new CDatabase();
?>
<html>
	<head>
		<title>Smart Scale</title>
		<style type="text/css">
			body, html, td {
				font-family: Verdana, Arial, helvetica, sans-serif;
				font-size: 14px;
			}
			
			tr.hover:hover {
				background-color: #e2e2e2;
			}
			
			tr.hidden {
				display: none;
			}
			
		</style>
		<script>
			function toggleData(id) {
				var dataRow = document.getElementById("row"+id);
				console.log("id="+id+"; hidden="+dataRow.dataset.hidden);
				if(dataRow.dataset.hidden=="true") {
					console.log("expanding");
					dataRow.dataset.hidden = "false";
					dataRow.style.cssText = "display: table-row";
				} else {
					console.log("hiding");
					dataRow.dataset.hidden = "true";
					dataRow.style.cssText = "display: none";
				}
			}
		</script>
	</head>
	<body>
		<table width="50%" border="0" cellpadding="6" cellspacing="1">
			<tr bgcolor="#dddddd">
				<td><b>#</b></td>
				<td><b>Date/time</b></td>
				<td><b>IP Address</b></td>
				<td><b>Device MAC</b></td>
				<td><b>Visit ID</b></td>
				<td><b>Complete data?</b></td>
				<td><b>Data</b></td>
			</tr>
			<? $res = $db->getData("select * from scale_data order by __ctime desc limit 100");
			foreach($res as $no=>$line) {
			?>
			<tr bgcolor="#f2f2f2" class="hover">
				<td><?=$no+1?>.</td>
				<td><?=date("d.m.Y H:i:s", strtotime($line['__ctime']))?></td>
				<td><?=$line['IP']?></td>
				<td><?=$line['DeviceAddress']?></td>
				<td><?=$line['visit_id']?></td>
				<td><?=$line['isComplete']>0?"yes":"no" ?></td>
				<td><a href="javascript:toggleData(<?=$line['__id']?>)" id="link<?=$line['__id']?>">expand</a></td>
			</tr>
			<tr class="hidden" id="row<?=$line['__id']?>" data-hidden="true">
				<td colspan="7">
					<pre>
					<?=print_r(json_decode($line['Data'], true), true)?>
					</pre>
				</td>
			</tr>
			<? 
			} 
			?>
		</table>
	</body>
</html>