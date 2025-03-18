<?

function getSettings() {
	$result = [];
	
	$result['general'] = getSettingsGeneral();
	$result['background'] = getSettingsBackground();
	$result['slider'] = getSettingsSlider();
	
	return success($result);
}

//=========================================================================================

function updateSystemSettings($key, $value) {
	global $db;
	$res = $db->getData("select __id from settings where `Key`='".$db->escape($key)."'");
	$set = "`Key`='".$db->escape($key)."', `Value`='".$db->escape($value)."'";
	
	if(count($res)<1) $query = "insert into settings set ".$set;
	else $query = "update settings set ".$set." where __id='".$res[0]['__id']."'";
	$db->query($query);
}

function getSystemSettings($key) {
	global $db;
	$res = $db->getData("select `Value` from settings where `Key`='".$db->escape($key)."'");
	return $res[0]['Value'];
}

//=========================================================================================

function getSettingsGeneral() {
	$result = [
		"idleTimeout" => 120
	];
	return $result;
}

//=========================================================================================

function getSettingsBackground() {
	if(rand(0, 1)==0) $result = [
		"color" => "#ffffff"
	];
	else $result = [
		"image" => FILE_BASE."images/pic2.jpg"
	];
	$result = [];
	return $result;
}

//=========================================================================================

function getSettingsSlider() {
	$result = [];
	
	$result[] = [
		"url" => FILE_BASE."images/pic1.jpg",
		"type" => "image",
		"duration" => 20
	];
	
	$result[] = [
		"url" => FILE_BASE."images/pic2.jpg",
		"type" => "image",
		"duration" => 10
	];
	
	$result[] = [
		"url" => FILE_BASE."images/pic3.png",
		"type" => "image",
		"duration" => 5
	];
	
	/*$result[] = [
		"url" => FILE_BASE."images/video1.mp4",
		"type" => "video",
		"duration" => 0
	];*/
	
	return $result;
}

?>