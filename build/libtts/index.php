<?
header("Content-type: text/html; charset=utf-8");
?>
<html>
<head>
<title>Синтезатор речи (яндекс)</title>
<style type="text/css">
table td {
	vertical-align: top;
	background-color: #f2f2f2;
}
</style>
</head>
<body>
<h1>Синтезатор речи (Яндекс)</h1>
<table width="40%" cellspacing="2" cellpadding="3" border="0">
<tr>
	<td align="right" width="40%">Номер талона:</td>
	<td><input type="text" name="ticket" id="ticket" placeholder="20" value="20" onKeyUp="updatePhrase()"></td>
</tr>
<tr>
	<td align="right">Номер окна:</td>
	<td><input type="text" name="servicepoint" id="servicepoint" placeholder="1" value="1" onKeyUp="updatePhrase()"></td>
</tr>
<tr>
	<td align="right">Ожидаемая фраза:</td>
	<td><i id="phrase"></i></td>
</tr>
<tr>
	<td align="right">Голос:</td>
	<td><select name="voice" id="voice">
		<option value="alena:neutral">Алёна (нейтральная)</option>
		<option value="alena:good">Алёна (радостная)</option>
		<option value="filipp">Филипп</option>
		<option value="ermil:neutral">Ермил (нейтральный)</option>
		<option value="ermil:good">Ермил (радостный)</option>
		<option value="jane:neutral">Женя (нейтральная)</option>
		<option value="jane:good">Женя (радостная)</option>
		<option value="jane:evil">Женя (раздражённая)</option>
		<option value="madirus">Мадирус</option>
		<option value="omazh:neutral">Омаж (нейтральная)</option>
		<option value="omazh:evil">Омаж (раздражённая)</option>
		<option value="zahar:neutral">Захар (нейтральный)</option>
		<option value="zahar:good">Захар (радостный)</option>
	</select></td>
</tr>
<tr>
	<td align="right">Скорость произношения:</td>
	<td><input type="number" name="speed" id="speed" min="0.1" max="3" step="0.1" value="0.8"> по умолчанию = 0.8</td>
</tr>
<tr>
	<td>&nbsp;</td>
	<td><input type="button" value="Произнести" onClick="speakPhrase()"></td>
</tr>
</table>

<script src="libtts.js?v=<?=time()?>"></script>

<script>

var ticket;
var servicepoint;
var voice;
var speed;

function prepareFormValues() {
	ticket = document.getElementById('ticket').value;
	servicepoint = document.getElementById('servicepoint').value;
	voice = document.getElementById('voice').value;
	speed = document.getElementById('speed').value;
}

function speakPhrase() {
	prepareFormValues();
	if(ticket==""||servicepoint=="") alert("Не заполнены номер талона и/или номер окна!");
	else {
		var phrase = ["Посетитель с браслетом номер "+ticket+", ", "пройдите в кабинет "+servicepoint+"."];
		ttsSay(phrase, voice, speed);
	}
}

function updatePhrase() {
	prepareFormValues();
	if(ticket!=""&&servicepoint!="") {
		document.getElementById('phrase').innerHTML = "Посетитель с браслетом номер "+ticket+", пройдите в кабинет "+servicepoint;
	} else {
		document.getElementById('phrase').innerHTML = "---";
	}
}

updatePhrase();

</script>

</body>
</html>