<?

DEFINE("DEVICE_SERVICE_ADDRESS", "127.0.0.1");
DEFINE("DEVICE_SERVICE_PORT", 15888);

DEFINE("HEIGHT_METER_OFFSET", 216); // height above the base, in centimeters
DEFINE("HEIGHT_METER_ENABLED", true);
DEFINE("PULSEOXIMETER_ENABLED", true);
DEFINE("BPM_ENABLED", true);

//====================================================================================

function getResponseInSocket($sock, $request, $needed_device = "") {
	$debug[] = "GRIS: starting to connect to socket";

	socket_write($sock, $request);
	$debug[] = "request sent";
	$response=@socket_read($sock, 8192, PHP_NORMAL_READ);
	if($response=="") $debug[] = "no response";
	else {
		$debug[] = "got response from socket: ".$response;
		$parsed_response = json_decode($response, true);
		$debug[] = "got device in response: ".$parsed_response['device'];
		if($needed_device!=$parsed_response['device']) {
			$response = "";
			$debug[] = "wrong response, will re-query";
		}
	}

	return $response;
}

function createServiceSocket() {
	$sock = socket_create(AF_INET, SOCK_STREAM, 6);
	if(!$sock) return false;
	socket_set_option($sock, SOL_SOCKET, SO_RCVTIMEO, array("sec"=>30, "usec"=>0));
	socket_set_option($sock, SOL_SOCKET, SO_SNDTIMEO, array("sec"=>30, "usec"=>0));
	try {
		socket_connect($sock, DEVICE_SERVICE_ADDRESS, DEVICE_SERVICE_PORT);
	} catch(Exception $e) {
		return false;
	}
	return $sock;
}

function getStandDeviceAPIResponse($request) {
	global $tm, $debug;
	$tm = microtime(true);
	$needed_device = "";
	if(is_array($request)) {
		$debug[] = "GSDAR: api request is valid";
		if($request['request']=="measure") {
			$needed_device = $request['device'];
			$debug[] = "GSDAR: will need to wait for response on ".$needed_device;
		}
		
		$count = 1;

		$sock = createServiceSocket();
		
		do {
			$response = getResponseInSocket($sock, json_encode($request), $needed_device);
			$error = socket_last_error($sock);
			if($error>0) {
				@socket_close($sock);
				$sock = createServiceSocket();
			}
			$count++;
		} while ($response=="" && $count<3);
		if($count>=3) $debug[] = "Got timeout";
		@socket_close($sock);

		$debug[] = "GSDAR: response received: $response";
		
		if(!$response) return false;
		else return json_decode($response, true);
	} else {
		return false;
	}
}

//====================================================================================

function getDevicesStatus() {
	$request = [
		"request" => "status"
	];
	$response = getStandDeviceAPIResponse($request);
	return success($response);
}

//====================================================================================

function getStandDeviceHeightMeterData() {	
	global $debug;
	if(HEIGHT_METER_ENABLED) {
		$request = [
			"request" => "measure",
			"device" => "height-meter"
		];
		$count = 1;
		do {
			$has_measurement = false;
			$response = getStandDeviceAPIResponse($request);
			if($response['status']=="ok") {
				$distance = intval($response['result']['value']);
				$debug[] = "raw measured distance: ".$distance;
				if($distance<1) $distance = 0;
				else if($distance>122&&$distance<127) $distance = 0;
				else $has_measurement = true;
			} else $distance = 0;
			$count++;
		} while (!$has_measurement && $count<10);
	} else $distance = 0;
	if($distance>0) $distance = round(HEIGHT_METER_OFFSET - $distance, 2);
	return $distance;
}

//====================================================================================

function getStandDevicePulseOximeterData() {	
	global $debug;
	if(PULSEOXIMETER_ENABLED) {
		$request = [
			"request" => "measure",
			"device" => "pulseoximeter"
		];
		$count = 1;
		do {
			$result = false;
			$debug[] = "GSDPOD: pulseoximeter measurement #".$count;
			$response = getStandDeviceAPIResponse($request);
			$debug[] = "GSDPOD got response: ";
			$debug[] = $response;
			if($response['status']=="ok") {
				$result = [];
				$debug[] = "result is ok";
				foreach($response['result'] as $line) {
					$result[$line['parameter']] = $line['value'];
				}
			} else {
				$debug[] = "got error, will re-try";
			}
			$count++;
		} while(!$result && $count<5);
	} else $result = false;
	if($count>=5) $debug[] = "GSDPOD: timeout received";
	return $result;
}

//====================================================================================

function getStandDeviceBPMData() {	
	global $debug;
	if(BPM_ENABLED) {
		$request = [
			"request" => "measure",
			"device" => "blood-pressure-monitor"
		];
		$response = getStandDeviceAPIResponse($request);
		$debug[] = "got response from bpm:";
		$debug[] = $response;
		if($response['status']=="ok") {
			$result = [];
			foreach($response['result'] as $line) {
				$result[$line['parameter']] = $line['value'];
			}
			$debug[] = "parsed response:";
			$debug[] = $result;
			return $result;
		}
	} else return false;
}

//====================================================================================

function getStandDeviceImpedanceData() {	
	global $db_remote;
	$count = 0;
	do {
		$found_complete = false;
		$res = $db_remote->getData("select * from scale_data where visit_id=0 order by isComplete desc, __id desc limit 1");
		if($res[0]['isComplete']) $found_complete = true;
		else sleep(1);
		$count++;
	} while (!$found_complete && $count<40);
	if(count($res)<1) return false;
	else return $res[0];
}

?>