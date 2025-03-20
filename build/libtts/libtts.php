<?


class CSpeechKit {
	private $YANDEX_CLOUD_OAUTH_TOKEN = "";
	const YANDEX_CLOUD_FOLDER_ID = "b1gchtpmio3me3dfdsj6";
	const LOGFILE = "libtts.log";
	const IAM_TOKEN_FILE = "iam_token.json";
	const IAM_TOKEN_LIFETIME = 3600; // seconds
	
	private $debugInfo = [];
	private $iam_token = "";
	

	//===============================================================================

	function CSpeechKit() {
		$this->YANDEX_CLOUD_OAUTH_TOKEN = file_get_contents("oauth_key.txt");
	}
	
	//===============================================================================
	
	public function log($str) {
		$fl = fopen(self::LOGFILE, "a");
		fwrite($fl, date("[d.m.Y H:i:s] "));
		fwrite($fl, $str."\n");
		fclose($fl);
	}
	
	//===============================================================================
	
	private function init() {
		// try to read IAM token
		if(!file_exists(self::IAM_TOKEN_FILE)||filesize(self::IAM_TOKEN_FILE)<1||time()-filemtime(self::IAM_TOKEN_FILE)>self::IAM_TOKEN_LIFETIME) {
			$this->log("Trying to obtain IAM token... ");
			$token = $this->runAPIRequest("https://iam.api.cloud.yandex.net/iam/v1/tokens", array("yandexPassportOauthToken" => $this->YANDEX_CLOUD_OAUTH_TOKEN), "json", true);
			file_put_contents(self::IAM_TOKEN_FILE, $token);
		} else {
			$this->log("Reading cached IAM token... ");
		}
		$tokenData = json_decode(file_get_contents(self::IAM_TOKEN_FILE), true);
		$this->iam_token = $tokenData['iamToken'];
		if($this->iam_token=="") {
			$this->log("ERROR: Cannot obtain IAM token");
			return false;
		} else {
			$this->log("using IAM token: ".$this->iam_token);
			return true;
		}
	}

	//===============================================================================
	
	public function returnSound($text, $voice, $emotion, $speed) {
		// first validate input variables
		
		if($text=="") $this->returnError("No text given");
		if(!$this->voiceIsValid($voice)) $this->returnError("Invalid Voice value");
		if($speed<0.1||$speed>3) $this->returnError("Invalid Speed value");
		// all checks passed
		
		$postdata = $this->prepareRequest($text, $voice, $emotion, $speed);
		
		// do we have it cached?
		$result = $this->getCachedResult($postdata);
		if(!$result) { // no, let's run API request
			$this->log("not found in cache, need to request");
		
			if($this->init()) {
				$result = $this->runAPIRequest("https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize", $postdata);
				if($result) { // all fine, let's store in cache
					$this->storeCachedResult($postdata, $return);
				}
			}
			else $result = false;
		} else {
			$this->log("result is cached");
		}
		return $result;
	}

	//===============================================================================
	
	private function prepareRequest($text, $voice, $emotion, $speed) {
		$request = array();
		$request['text'] = $text;
		$request['lang'] = "ru-RU";
		$request['voice'] = $voice;
		if($emotion!="") $request['emotion'] = $emotion;
		$request['speed'] = $speed;
		$request['format'] = "mp3";
		$request['folderId'] = self::YANDEX_CLOUD_FOLDER_ID;
		return $request;
	}

	//===============================================================================
	
	private function voiceIsValid($voice) {
		$allowed_voices = ["alena", "filipp", "ermil", "jane", "madirus", "omazh", "zahar", "dasha", "julia", "lera", "marina", "alexander", "kirill", "anton"];
		return in_array($voice, $allowed_voices);
	}

	//===============================================================================
	
	private function getCachePath($request) {
		$str = $request['text']."|".$request['lang']."|".$request['voice']."|".$request['emotion']."|".$request['speed']."|".$request['format'];
		$str = md5($str);
		$str = "cache/".$str;
		return $str;
	}
	
	//===============================================================================
	
	private function getCachedResult($request) {
		$dir = $this->getCachePath($request);
		if(!file_exists($dir."/result.mp3")) return false;
		else return file_get_contents($dir."/result.mp3");
	}
	
	//===============================================================================
	
	private function storeCachedResult($request, $data) {
		$dir = $this->getCachePath($request);
		mkdir($dir, 0755, true);
		file_put_contents($dir."/result.mp3", $data);
		file_put_contents($dir."/request.json", json_encode($request, JSON_UNESCAPED_UNICODE));
	}
	
	//===============================================================================
	
	private function runAPIRequest($url, $postdata=null, $type="post", $noauth = false) {
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
			
		if(is_array($postdata)) {
			curl_setopt($ch, CURLOPT_POST, 1);
			if($type=="json") {
				curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postdata));
				curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
			} else curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
		}
			
		if(!$noauth) curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer ".($this->iam_token)]);		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

		curl_setopt($ch, CURLOPT_VERBOSE, true);
		$verbose = fopen("php://temp", "w+");
		curl_setopt($ch, CURLOPT_STDERR, $verbose);
		$return = curl_exec($ch);
		rewind($verbose);
		$this->debugInfo[] = "CURL Stream:";
		$this->debugInfo[] = stream_get_contents($verbose);
		fclose($verbose);
		$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
			
		if($httpcode!="200") {
			$this->log("got error from API:");
			$this->log($return);
			return false;
		} else {
			return $return;
		}

	}
	
}

?>