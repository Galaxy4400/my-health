<?php
//=================================================================
//                      ENGINE DEFINITIONS
//=================================================================

//*****************************************************************
//                       Abante CMS Module
//
//           (C) Webis Group 2002-2022. All rights reserved.
//
//                    contact@webisgroup.ru
//                  http://www.webisgroup.ru
//                  http://cms.webisgroup.ru
//*****************************************************************

error_reporting (E_ERROR & !E_DEPRECATED);
unset($system_vars);
unset($ent);

define("SESSION_TIMEOUT", 720); // minutes

require("generic.php");

define("VERSION", 42);

DEFINE("DEBUG", false);
DEFINE("version", "1.10");
DEFINE("softwareYear", "2023");

// MySQL Connection Information

DEFINE ("MYSQL_DB", "stand");
DEFINE ("MYSQL_USER", "stand");
DEFINE ("MYSQL_PASSWORD", "05fS13~wb");
DEFINE ("MYSQL_HOST", "localhost");


// Templates Definitions
DEFINE("TEMPLATES_DIR", 'templates/');
DEFINE("TPL_ERROR", "error.htm");
DEFINE("TPL_ENTITY_PREFIX", "<!--%");
DEFINE("TPL_ENTITY_SUFFIX", "%-->");
DEFINE("TPL_INCLUDE", "include ");
DEFINE("TPL_LOOP_START", "loop ");
DEFINE("TPL_LOOP_END", "end loop ");
DEFINE("TPL_IF_START", "if ");
DEFINE("TPL_IF_END", "end if ");
DEFINE("SESSION_TBL", 'sessions');
DEFINE("UPLOAD_DIR", 'images/data');

$special_locations = array();

$languages = array("Русский", "Английский");

//-----------------------------------------------------
// object definitions
unset($objects);

//-----------------------------------------------------
// some generic functions now...

$monthArr = array ('января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря');
$monthArrEn = array ('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december');
$media_category = array(1 => "Фотогалерея", 2 => "Видеогалерея");
