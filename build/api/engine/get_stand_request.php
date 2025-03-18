<?
function getRequest() { // returns request data (GET or POST) in an associative array
	$request = [];
	if($_SERVER['REQUEST_METHOD']=="GET") $request = getRequestGET();
	else $request = getRequestPOST();
	$request['request_method'] = $_SERVER['REQUEST_METHOD'];
	return $request;
}

//=========================================================================================

function getRequestGET() {
	$request = $_GET;
	return $request;
}

//=========================================================================================

function getRequestPOST() {
	$request = json_decode(file_get_contents("php://input"), true);
	return $request;
}

//=========================================================================================

function success($response = []) { // general successful response wrapper
	$response['status'] = "ok";
	return $response;
}

//=========================================================================================

function error($message = "") { // general error wrapper
	$response = [];
	$response['status'] = "error";
	$response['message'] = $message;
	
	return $response;
}

//=========================================================================================

function validateVisit($visit_id) {
	global $db;
	$visit_id = intval($visit_id);
	if($visit_id<1) return false;
	else {
		$res = $db->getData("select __id from visits where __id='".$visit_id."'");
		if(count($res)<1) return false;
		else return true;
	}
}


?>