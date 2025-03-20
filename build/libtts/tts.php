<?
//======================================================

function wait_for_lock()
{
	global $lockfile;

	if (!file_exists("tts.lock")) touch("tts.lock");
	$lockfile = fopen("tts.lock", "r");

	while (!flock($lockfile, LOCK_EX)) {
		usleep(rand(0, 10000));
	}
}

function release_lock()
{
	global $lockfile;
	flock($lockfile, LOCK_UN);
	fclose($lockfile);
}

//======================================================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(204); // Успешный preflight-запрос
	exit();
}
//wait_for_lock();

require("libtts.php");

$speechKit = new CSpeechKit();

$phrase = $_REQUEST['phrase'];
list($voice, $emotion) = explode(":", $_REQUEST['voice']);
$speed = floatval($_REQUEST['speed']);



$speechKit->log("-----------------------------------");
$speechKit->log("processing request:");
$speechKit->log("phrase: " . $phrase . "; voice: " . $voice . "; emotion: " . $emotion . "; speed: " . $speed);

$sound = $speechKit->returnSound($phrase, $voice, $emotion, $speed);

if (!$sound) {
	header("HTTP/1.1 404 Not Found");
} else {
	header("Content-type: audio/mpeg");
	echo ($sound);
}

//release_lock();
