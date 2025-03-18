<?
require("include/defs.php");
require("include/dbconnect.php");
require("engine/get_stand.php");

$db = new CDatabase();
$db_remote = new CDatabase("server1.webisgroup.ru");

$debug = [];

//=====================================================

$request = getRequest();
$response = processRequest($request);



header("Content-type: application/json");
header("Access-Control-Allow-Origin: *"); // Разрешить только localhost:5173
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$response['debug'] = $debug;

echo(json_encode($response));

?>