<?
require("get_stand_request.php");
require("get_stand_settings.php");
require("get_stand_examination.php");
require("get_stand_devices.php");
require("get_stand_reports.php");

//=========================================================================================

DEFINE("SERVER_ADDRESS", "http://stand.webishost.ru/server/"); // central server address
DEFINE("FILE_BASE", "http://localhost/server/"); // base URL for images and videos

//=========================================================================================

function processRequest($request) { // main request handler
	switch($request['action']) {
		
		case "ping":
					$result = doPing();
					break;
					
		case "settings":
					$result = getSettings();
					break;
					
		case "examination":
					$result = processExamination($request);
					break;
					
		case "report":
					$result = processReport($request);
					break;
					
		case "devices":
					$result = getDevicesStatus();
					break;
		
		default:
					$result = invalidRequest();
					break;
	}
	
	$result['meta'] = $request;
	return $result;
}

//=========================================================================================

function doPing() {
	return success();
}

//=========================================================================================

function invalidRequest() {
	return error("Неизвестный запрос");
}


?>