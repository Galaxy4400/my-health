<?

// listens to smart scale service and stores data in scale_data table

require("include/defs.php");
require("include/dbconnect.php");
require("engine/get_stand_settings.php");
$db = new CDatabase();

//==================================================================

function loadPatientData() {
	$response = [];
	$response['gender'] = getSystemSettings("gender");
	$response['age'] = intval(getSystemSettings("age"));
	$response['height'] = round(getSystemSettings("height"));
	return $response;
}

//==================================================================

$response = loadPatientData();



header("Content-type: application/json");
$requestRaw = file_get_contents("php://input");
//echo_log("request from ".$_SERVER['REMOTE_ADDR']);
if($requestRaw!="") {
	$request = json_decode($requestRaw, true);
	if($request['data']['isStabilized']>0) {
		if($request['data']['bodyFatPercent']>0) $isComplete = "1";
		else $isComplete = "0";
		$db->query("insert into scale_data set
		__ctime = '".timeStr()."',
		DeviceAddress = '".$db->escape($request['deviceAddress'])."',
		IP='".$_SERVER['REMOTE_ADDR']."',
		isComplete='".$isComplete."',
		Data = '".$db->escape($requestRaw)."'");
	}
	
	//echo_log("request:");
	//echo_log(print_r($request, true));
	$response["status"] = "ok";
} else {
	$response["status"] = "idle";
	//echo_log("idle request");
}

echo(json_encode($response));
echo_log("request processed");
?>