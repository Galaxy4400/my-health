<?

define("COLOR_GREEN", "#95d665");
define("COLOR_YELLOW", "#ffea07");
define("COLOR_RED", "#fd521b");
define("COLOR_GRAY", "#e2e2e2");

function processReport($request) {
	$request['visit_id'] = intval($request['visit_id']);
	if(!validateVisit($request['visit_id']))  return error("Некорректный идентификатор визита");
	
	switch($request['subaction']) {
		
		case "print":
				return doReportSendToPrinter($request['visit_id']);
				break;
		
		case "email":
				return doReportSendToEmail($request['visit_id']);
				break;
		
		case "3d":
				return getReport3DModelLink($request['visit_id']);
				break;
		
		case "page":
				return getReportPage($request['visit_id'], $request['page']);
				break;
				
		case "medcard":
				return doReportSendToMedcard($request['visit_id'], $request['code']);
				break;
		
		default:
				return doPrepareReport($request['visit_id']);
				break;
	}
}


//=========================================================================================

function getReportPage($visit_id, $page) {
	switch($page) {
		
		case "body":
				return getReportBodyPage($visit_id);
				break;
		
		case "metabolic":
				return getReportMetabolicPage($visit_id);
				break;
		
		case "stress":
				return getReportStressPage($visit_id);
				break;
		
		case "heart":
				return getReportHeartPage($visit_id);
				break;
				
		case "risks":
				return getReportRisksPage($visit_id);
				break;
				
		case "nutrition":
				return getReportNutritionPage($visit_id);
				break;
				
		case "assignments":
				return getReportAssignmentsPage($visit_id);
				break;
		
		default:
				return getReportOverviewPage($visit_id);
				break;
	}
}

//=========================================================================================

function getIndicatorStatus($label, $code, $value, $min, $max, $normal, $custom_prefix = "", $custom_suffix = "", $debug = false) { // sets up parameters for color indicators
	
	$result = [];
	if($debug) echo("getIndicatorStatus(label=$label; value=$value; min=$min; max=$max; normal=$normal)\n");
	
	if($min<1&&$max<1&&$normal<1) $text_only = true;
	$result['label'] = $label;
	$result['code'] = $code;
	
	if($value<1) { // no data
		$result['title'] = "нет данных";
		$result['value'] = false;
		$result['min'] = false;
		$result['max'] = false;
		$result['gradientColors'] = [COLOR_GRAY];
	} else {
		if($value=="") $value = 0;
		$value = round($value, 1);
		$value_for_arrow = $value;
		if($value_for_arrow<$min) $value_for_arrow = $min;
		if($value_for_arrow>$max) $value_for_arrow = $max;
	
		// get written status
		$deviation = $value-$normal;
		$deviation_percent = abs(round(($deviation/$normal)*100));
		
		$status = "в норме";
		
		if($deviation<0) {
			if($deviation_percent>20) $status = "очень низко";
			else if($deviation_percent>10) $status = "ниже нормы";
		}
		
		if($deviation>0) {
			if($deviation_percent>20) $status = "очень высоко";
			else if($deviation_percent>10) $status = "выше нормы";
		}
		
		if(!$text_only) {
			if($custom_prefix=="") $status.=" (".$value.$custom_suffix.")";
			else $status = $custom_prefix.$value.$custom_suffix;
		}
		else $status = $value;
		
		
		
		// risk rating, for calculating overall score
		if($deviation_percent>20) $rating = 2;
		else if($deviation_percent>10) $rating = 1;
		else $rating = 0;
		
		if($max==$normal && $value>$max) $rating = 0; 
		if($min==$normal && $value<$min) $rating = 0; 
		
		$result['risk_rating'] = $rating;
		
		
		$result['title'] = $status;
		$result['value'] = ($value_for_arrow>0)?floatval($value_for_arrow):false;
		$result['min'] = $min;
		$result['max'] = $max;
		
		// get color scale
		$scale = [];
		$scale[0] = COLOR_GREEN;
		$distance_down = $normal-$min;
		$distance_up = $max-$normal;
		
		if($debug) echo("distance: down=$distance_down; up=$distance_up\n");
		
		if($distance_down>0) $largest_distance = $distance_down;
		if($distance_up>0 && $distance_up>$largest_distance) $largest_distance = $distance_up;
		
		$step = $largest_distance/4;
		
		if($debug) echo("step=$step\n");
			
		$steps_down = ceil($distance_down/$step);
		$steps_up = ceil($distance_up/$step);
		
		if($debug) echo("steps: down=$steps_down; up=$steps_up\n");
		
		// draw colors down
		for($step = 0; $step<$steps_down; $step++) {
			$step_progress = round($step*100/$steps_down);
			if($step_progress<10) $color = COLOR_GREEN;
			else if($step_progress<50) $color = COLOR_YELLOW;
			else $color = COLOR_RED;
			if($debug) echo("  down: step=$step; progress=$step_progress; color=$color\n");
			$scale[0-$step] = $color;
		}
		
		// draw colors up
		for($step = 0; $step<$steps_up; $step++) {
			$step_progress = round($step*100/$steps_up);
			if($step_progress<=15) $color = COLOR_GREEN;
			else if($step_progress<=50) $color = COLOR_YELLOW;
			else $color = COLOR_RED;
			if($debug) echo("  up: step=$step; progress=$step_progress; color=$color\n");
			$scale[$step] = $color;
		}
		
		if($debug) echo("scale: ".print_r($scale, true));
		ksort($scale);
		if($text_only) $scale = [];
		$result['gradientColors'] = array_values($scale);
		
		if($debug) echo("colors: ".print_r($result['colors'], true));
		
		if($debug) die("all.");
	}
	
	return $result;
}

//=========================================================================================

function getOverallScore($label, &$statuses, $mock = false) { // computes page score based on pre-calculated indicators on this page
	
	$score = 0;
	$max = count($statuses)*2;
	foreach($statuses as &$status) {
		$score+=$status['risk_rating'];
		//unset($status['risk_rating']);
	}
	
	$rating = floor(10 - ($score * 10 / $max));
	
	$result = [];
	
	//die("score=$score; max=$max; percent=$percent");
	
	if($mock) $rating = 8;
	
	if($rating>=8) $result = [
		"title" => "Отлично",
		"color" => COLOR_GREEN
	];
	
	else if($rating>=6) $result = [
		"title" => "Хорошо",
		"color" => COLOR_YELLOW
	];
	
	else $result = [
		"title" => "Риск",
		"color" => COLOR_RED
	];
	
	$result['value'] = $rating."/10";
	$result['label'] = $label;
	
	return $result;
}

//=========================================================================================

function getReportHeartInfo($visit_id) {
	global $db;
	
	$result = [];
	
	$res = $db->getData("select * from pulseoximeter_data where visit_id='".$visit_id."'");
	
	if(count($res)>0) {
		$result['raw']['spo2'] = $res[0]['SpO2'];
		$result['raw']['heartrate_min'] = $res[0]['HeartRate_min'];
		$result['raw']['heartrate_avg'] = $res[0]['HeartRate_avg'];
		$result['raw']['heartrate_max'] = $res[0]['HeartRate_max'];
	}
		
	$res = $db->getData("select * from bpm_data where visit_id='".$visit_id."'");
	
	if(count($res)>0) {
		$result['raw']['systolic'] = $res[0]['Systolic'];
		$result['raw']['diastolic'] = $res[0]['Diastolic'];
		if($result['raw']['heartrate_avg']<1) $result['raw']['heartrate_avg'] = $res[0]['HeartRate'];
	}
	
	$result['statuses'] = [];
		
	$result['statuses'][] = getIndicatorStatus("Пульс:", "heart.rate", $result['raw']['heartrate_avg'], 50, 200, 65, "", "/мин.");
	$result['statuses'][] = getIndicatorStatus("Систолическое давление:", "heart.systolic", $result['raw']['systolic'], 90, 250, 120);
	$result['statuses'][] = getIndicatorStatus("Диастолическое давление:", "heart.diastolic", $result['raw']['diastolic'], 50, 150, 80);
	$result['statuses'][] = getIndicatorStatus("Насыщение крови кислородом (SpO2):", "heart.spo2", $result['raw']['spo2'], 90, 100, 100, "", "%");
	
	// evaluate heart rhythm deviations
	
	if($result['raw']['heartrate_min']>0&&$result['raw']['heartrate_max']>0) {
		$deviation = max($result['raw']['heartrate_avg']-$result['raw']['heartrate_min'], $result['raw']['heartrate_max']-$result['raw']['heartrate_avg']);
		if($deviation>10) $heartrhythm = [
			"gradientColors" => [COLOR_YELLOW],
			"label" => "Нарушения сердечного ритма:",
			"title" => "возможен риск",
			"value" => 2,
			"min" => 1,
			"max" => 2,
			"risk_rating" => 1
		];
		else $heartrhythm = [
			"gradientColors" => [COLOR_GREEN],
			"label" => "Нарушения сердечного ритма:",
			"title" => "риск не выявлен",
			"value" => 1,
			"min" => 1,
			"max" => 2,
			"risk_rating" => 0
		];
	} else {
		$heartrhythm = [
			"gradientColors" => [COLOR_GRAY],
			"label" => "Нарушения сердечного ритма:",
			"title" => "нет данных",
			"value" => 0,
			"min" => 1,
			"max" => 2,
			"risk_rating" => 0
		];
	}
	
	$result['statuses'][] = $heartrhythm;
	
	$result['score'] = getOverallScore("Сердечно сосудистая система", $result['statuses']);
	
	return $result;
}

//=========================================================================================

function getReportHeartPage($visit_id) {
	$info = getReportHeartInfo($visit_id);
	return success($info);
}

//=========================================================================================

function getReportStressInfo($visit_id) {
	global $db;
	$result = [];
	
	$no_bpm = false;
	$no_po = false;
	
	$stress = 1;
	$fatigue = 1;
	
	$res = $db->getData("select * from pulseoximeter_data where visit_id='".$visit_id."'");
	
	if(count($res)>0 && $res[0]['SpO2']>0) {
		$result['raw']['spo2'] = floatval($res[0]['SpO2']);
		$result['raw']['heartrate_min'] = intval($res[0]['HeartRate_min']);
		$result['raw']['heartrate_avg'] = intval($res[0]['HeartRate_avg']);
		$result['raw']['heartrate_max'] = intval($res[0]['HeartRate_max']);
	} else $no_po = true;
		
	$res = $db->getData("select * from bpm_data where visit_id='".$visit_id."'");
	
	if(count($res)>0 && $res[0]['HeartRate']>0) {
		$result['raw']['systolic'] = intval($res[0]['Systolic']);
		$result['raw']['diastolic'] = intval($res[0]['Diastolic']);
		$result['raw']['pulse'] = $result['raw']['systolic']-$result['raw']['diastolic'];
		if($result['raw']['heartrate_avg']<1) $result['raw']['heartrate_avg'] = intval($res[0]['HeartRate']);
	} else $no_bpm = true;
	
	$result['raw']['no_po'] = $no_po;
	$result['raw']['no_bpm'] = $no_bpm;
	
	
	if($no_po&&$no_bpm) { // no data
		$stress = 0;
		$fatigue = 0;
	} else {
		if($result['raw']['pulse']<35) $fatigue++;
		if($result['raw']['systolic']>140) $stress++;
		if($result['raw']['diastolic']>100) $stress++;
		if($result['raw']['heartrate_avg']>80) $stress++;
		if($result['raw']['heartrate_avg']<60) $fatigue++;
		if($result['raw']['spo2']<95) $fatigue++;
	}
	
	$result['statuses'] = [];
			
	$result['statuses'][] = getIndicatorStatus("Оценка стресса:", "stress.stress", $stress, 0, 3, 0);
	$result['statuses'][] = getIndicatorStatus("Оценка усталости:", "stress.fatigue", $fatigue, 0, 3, 0);
	
	$result['score'] = getOverallScore("Стресс", $result['statuses']);
	
	return $result;
	
}

//=========================================================================================

function getReportStressPage($visit_id) {
	$info = getReportStressInfo($visit_id);
	return success($info);
}

//=========================================================================================

function getReportMetabolicInfo($visit_id) {
	global $db;
	$impedance = getLatestImpedanceData($visit_id);
	
	$result = [];
	
	$height = getHeight($visit_id);
		
	$weight = round($impedance['weight_kg'], 2);
	if($weight>0 && $height>0) {
		$bmi = round($weight / (($height/100) ** 2), 1);
	} else $bmi = 0;
	
	$visit = getVisitInfo($visit_id);
	$result['raw']['age_real'] = intval($visit['Age']);
	$result['raw']['age_metabolic'] = intval($impedance['physicalAge']);
	
	$result['raw']['height'] = $height;
	$result['raw']['weight'] = $weight;
	$result['raw']['bmi'] = $bmi;
	$result['raw']['calories'] = intval($impedance['bmr']);
	
	$result['statuses'] = [];
	
	$result['statuses'][] = getIndicatorStatus("Индекс массы тела:", "metabolic.bmi", $bmi, 16, 40, 21);
	$result['statuses'][] = getIndicatorStatus("Метаболический возраст тела:", "metabolic.age", $result['raw']['age_metabolic'], min($result['raw']['age_metabolic'], $result['raw']['age_real']), $result['raw']['age_real']+20,  min($result['raw']['age_metabolic'], $result['raw']['age_real']));
	$result['statuses'][] = getIndicatorStatus("Базальная скорость обмена веществ:", "metabolic.bmr", $result['raw']['calories'], 0, 0, 0, "", " ККал");
	
	$result['score'] = getOverallScore("Обмен веществ", $result['statuses']);
	
	return $result;
	
}

//=========================================================================================

function getReportMetabolicPage($visit_id) {
	$info = getReportMetabolicInfo($visit_id);
	return success($info);
}

//=========================================================================================

function getReportBodyInfo($visit_id) {
	global $db;
	$impedance = getLatestImpedanceData($visit_id);
	
	$result = [];
	$result['statuses_tab1'] = [];
	$result['statuses_tab2'] = [];
	$result['statuses_tab3'] = [];
	
	$weight = round($impedance['weight_kg'], 1);
	
	// tab 1
	$result['raw']['muscleMass'] = $muscleMass = round(($weight * $impedance['musclePercent'] / 100), 1);
	$result['raw']['musclePercent'] = $musclePercent = round($impedance['musclePercent'], 1);
	$result['raw']['bodyFatPercent'] = $bodyFatPercent = round($impedance['bodyFatPercent'], 1);
	$result['raw']['skinFatPercent'] = $skinFatPercent = round($impedance['subcutaneousFatPercent'], 1);
	$result['raw']['visceralFat'] = $visceralFat = round($impedance['visceralFat']);
	$result['raw']['waterPercent'] = $waterPercent = round($impedance['moisturePercent'], 1);
	
	$result['statuses_tab1'][] = getIndicatorStatus("Мышечная масса:", "", $muscleMass, round($weight/3), round($weight/1.6), round($weight/1.6), "", " кг");
	$result['statuses_tab1'][] = getIndicatorStatus("Процент мышц:", "body.musclepercent", $musclePercent, 30, 60, 60, "", "%");
	$result['statuses_tab1'][] = getIndicatorStatus("Телесный жир:", "body.fatpercent", $bodyFatPercent, 5, 30, 15, "", "%");
	$result['statuses_tab1'][] = getIndicatorStatus("Подкожный жир:", "body.skinfatpercent", $skinFatPercent, 4, 30, 12, "", "%");
	$result['statuses_tab1'][] = getIndicatorStatus("Висцеральный жир:", "body.visceral", $visceralFat, 10, 40, 10);
	$result['statuses_tab1'][] = getIndicatorStatus("Вода:", "body.water", $waterPercent, 20, 50, 50, "", "%");
	
	// tab 2
	$result['raw']['weight'] = $weight;
	$result['raw']['skeletalMusclePercent'] = $skeletalMusclePercent = round($impedance['smPercent'], 1);
	$result['raw']['boneMass'] = $boneMass = round($impedance['boneMass'], 1);
	$result['raw']['proteinPercent'] = $proteinPercent = round($impedance['proteinPercent'], 1);
	$result['raw']['height'] = $height = getHeight($visit_id);
	$result['raw']['targetWeight'] = $targetWeight = round($impedance['targetWeight'], 1);
	
	$result['statuses_tab2'][] = getIndicatorStatus("Вес:", "", $weight, 0, 0, 0, "", " кг");
	$result['statuses_tab2'][] = getIndicatorStatus("Скелетные мышцы:", "body.skeletalmuscle", $skeletalMusclePercent, 20, 40, 40, "", "%");
	$result['statuses_tab2'][] = getIndicatorStatus("Костная масса", "", $boneMass, round($weight/40), round($weight/20), round($weight/20));
	$result['statuses_tab2'][] = getIndicatorStatus("Белок", "body.protein", $proteinPercent, 5, 15, 15, "", "%");
	$result['statuses_tab2'][] = getIndicatorStatus("Рост:", "", $height, 0, 0, 0, "", " см");
	$result['statuses_tab2'][] = getIndicatorStatus("Идеальный вес тела:", "", $targetWeight, 0, 0, 0, "", "кг");
	
	// tab 3
	$items = [];
	$extData = $impedance['extData'];
	
	
	$items[] = [
		'label' => "Левая рука",
		'row' => 1,
		'col' => 1,
		'gradients' => [
			getIndicatorStatus("", "", $extData['left_arm'], 70, 300, 100, "жир: ", "%"),
			getIndicatorStatus("", "", $extData['left_arm_muscle'], 50, 200, 100, "мышцы: ", "%")
		]
	];
	
	$items[] = [
		'label' => "Правая рука",
		'row' => 1,
		'col' => 3,
		'gradients' => [
			getIndicatorStatus("", "", $extData['right_arm'], 70, 300, 100, "жир: ", "%"),
			getIndicatorStatus("", "", $extData['right_arm_muscle'], 50, 200, 100, "мышцы: ", "%")
		]
	];
	
	$items[] = [
		'label' => "Торс",
		'row' => 2,
		'col' => 2,
		'gradients' => [
			getIndicatorStatus("", "", $extData['all_body'], 70, 300, 100, "жир: ", "%"),
			getIndicatorStatus("", "", $extData['all_body_muscle'], 50, 200, 100, "мышцы: ", "%")
		]
	];
	
	$items[] = [
		'label' => "Левая нога",
		'row' => 3,
		'col' => 1,
		'gradients' => [
			getIndicatorStatus("", "", $extData['left_leg'], 70, 300, 100, "жир: ", "%"),
			getIndicatorStatus("", "", $extData['left_leg_muscle'], 50, 200, 100, "мышцы: ", "%")
		]
	];
	
	$items[] = [
		'label' => "Правая нога",
		'row' => 3,
		'col' => 3,
		'gradients' => [
			getIndicatorStatus("", "", $extData['right_leg'], 70, 300, 100, "жир: ", "%"),
			getIndicatorStatus("", "", $extData['right_leg_muscle'], 50, 200, 100, "мышцы: ", "%")
		]
	];

	$result['statuses_tab3'] = $items;
	
	$tab3_for_calc = [];
	foreach($items as $item) {
		foreach($item['gradients'] as $gradient) {
			$tab3_for_calc[] = $gradient;
		}
	}
	
	$allStatuses = array_merge($result['statuses_tab1'], $result['statuses_tab2'], $tab3_for_calc);
	
	//return $allStatuses;
	
	
	$result['score'] = getOverallScore("Состав тела", $allStatuses, true);
	
	return $result;
}

//=========================================================================================

function getReportBodyPage($visit_id) {
	$info = getReportBodyInfo($visit_id);
	return success($info);
}

//=========================================================================================

function getReportOverviewInfo($visit_id) {
	$result = [];
	
	$body = getReportBodyInfo($visit_id)['score'];
	$metabolic = getReportMetabolicInfo($visit_id)['score'];
	$stress = getReportStressInfo($visit_id)['score'];
	$heart = getReportHeartInfo($visit_id)['score'];
	
	$result['items'] = [
		$body,
		$metabolic,
		$stress,
		$heart
	];
	
	// get an average score
	$score = 0;
	foreach($result['items'] as $item) {
		list($item_score, $item_max) = explode("/", $item['value']);
		$score+=$item_score;
	}
	$score = round($score / 4);
	
	if($score<5) {
		$status = "Риск";
		$color = COLOR_RED;
	} else if($score<7) {
		$status = "Средне";
		$color = COLOR_YELLOW;
	} else if($score<9) {
		$status = "Хорошо";
		$color = COLOR_GREEN;
	} else {
		$status = "Отлично";
		$color = COLOR_GREEN;
	}
	
	$result['score'] = [
		"label" => "Общая оценка",
		"color" => $color,
		"title" => $status,
		"value" => $score."/10"
	];
	
	
	return $result;
}

//=========================================================================================

function getReportOverviewPage($visit_id) {
	global $db;
	$info = getReportOverviewInfo($visit_id);
	return success($info);
}

//=========================================================================================

function getReportRisksInfo($visit_id) {
	global $db;
	$body = getReportBodyInfo($visit_id);
	$metabolic = getReportMetabolicInfo($visit_id);
	$stress = getReportStressInfo($visit_id);
	$heart = getReportHeartInfo($visit_id);
	
	$result = [];
	
	// leave only most important indicators
	$global_indicators_temp = array_merge($body['statuses_tab1'], $body['statuses_tab2'], $metabolic['statuses'], $stress['statuses'], $heart['statuses']);
	
	
	$global_indicators = [];
	
	foreach($global_indicators_temp as $indicator) {
		if($indicator['code']!="") $global_indicators[] = $indicator;
	}
	
	usort($global_indicators, "indicator_sort");
	$result['statuses'] = array_slice($global_indicators, 0, 5);
	$result['content'] = "<ol><li>Консультация врача</li><li>Правильное питание</li><li>Умеренные физические нагрузки</li></ol>";
	return $result;
}

function indicator_sort($a, $b) {
	if($a['risk_rating']>$b['risk_rating']) return -1;
	else if($a['risk_rating']<$b['risk_rating']) return 1;
	else return 0;
}

//=========================================================================================

function getReportRisksPage($visitor_id) {
	$info = getReportRisksInfo($visitor_id);
	return success($info);
}

//=========================================================================================

function getReportNutritionInfo($visit_id) {
	global $db;
	
	$result = [];
	
	$content = "<div class=\"section\"><p class=\"daily\">Ежедневный расход энергии: <b>3500 Kcal</b></p>";
	$content .= "<h5 class=\"norecommend\">Не рекомендуемые продукты:</h5>";
	$content .= "<p><b>Овощи:</b> картофель, кукуруза, редька, свёкла</p>";
	$content .= "<p><b>Животные жиры:</b> жирное мясо, копчёное мясо, твёрдые сыры</p>";
	$content .= "<p><b>Углеводы:</b> белый сахар, белый хлеб, мёд, шоколад, мороженое, глутамат натрия</p>";
	$content .= "<p><b>Жиры:</b> фритюры, майонез</p>";
	$content .= "<p><b>Напитки:</b> крепкий алкоголь, пиво, какао, сладкие напитки, газированные напитки</p>";
	$content .= "<h5 class=\"recommend\">Рекомендуемые продукты:</h5>";
	$content .= "<p><b>Овощи:</b> капуста, огурцы, лук, чеснок, зелёные овощи</p>";
	$content .= "<p><b>Животные жиры:</b> лосось, тунец, говяжья печень, яичный желток</p>";
	$content .= "<p><b>Молочные продукты:</b> сыры невысокой жирности, йогурты, молоко не длительного хранения</p>";
	$content .= "<p><b>Фрукты и ягоды:</b> яблоко, груша, курага, малина, слива</p>";
	$content .= "<p><b>Злаки:</b> отруби, гречка, пшено, овёс, кресс-салат</p>";
	$content .= "<p><b>Прочее:</b> соя, морская капуста</p>";

	$result['content'] = $content;
	return $result;
}

//=========================================================================================

function getReportNutritionPage($visitor_id) {
	$info = getReportNutritionInfo($visitor_id);
	return success($info);
}

//=========================================================================================

function getReportAssignmentsInfo($visit_id) {
	global $db;
	
	$result = [];
	
	$content = "<div class=\"section\"><h5 class=\"title\">Спортивные нагрузки:</h5>";
	$content .= "<h5 class=\"norecommend\">Не рекомендуемые:</h5>";
	$content .= "<p>тяжёлая атлетика, бег</p>";
	$content .= "<h5 class=\"recommend\">Рекомендуемые:</h5>";
	$content .= "<p>плавание, ходьба, спортивная ходьба</p></div>";
	$content .= "<div class=\"section\"><h5 class=\"title\">SPA-процедуры:</h5>";
	$content .= "<h5 class=\"norecommend\">Не рекомендуемые:</h5>";
	$content .= "<p>баня</p>";
	$content .= "<h5 class=\"recommend\">Рекомендуемые:</h5>";
	$content .= "<p>массаж, прессотерапия</p></div>";
	
	$result['content'] = $content;
	return $result;
}

//=========================================================================================

function getReportAssignmentsPage($visitor_id) {
	$info = getReportAssignmentsInfo($visitor_id);
	return success($info);
}

//=========================================================================================

function doPrepareReport($visit_id) { // create HTML/PDF report files
	global $db;
	
	// WRITE ME: generate all reports as files
	
	sleep(5);
	
	$db->query("update visits set hasReport=1 where __id='".$visit_id."'");
	
	return success();
}

//=========================================================================================

function getReport3DModelLink($visit_id) { // gets link to 3d model of specific gender with needed parts highlighted
	global $db;
	
	$impedance = getLatestImpedanceData($visit_id);
	$visit = getVisitInfo($visit_id);
	
	$params = [];
	
	if($visit['Gender']=="male") $params[] = "model=man";
	else $params[] = "model=woman";
	
	$extData = $impedance['extData'];
	
	$highlights = [];
	
	if($extData['all_body_muscle']>0) {
	
		if($extData['left_arm']>400 || $extData['left_arm_muscle']<70) $highlights[] = "Hand_l_red:".COLOR_RED;
		else if($extData['left_arm']>200 || $extData['left_arm_muscle']<85) $highlights[] = "Hand_l_red:".COLOR_YELLOW;
		
		if($extData['right_arm']>400 || $extData['right_arm_muscle']<70) $highlights[] = "Hand_r_red:".COLOR_RED;
		else if($extData['right_arm']>200 || $extData['right_arm_muscle']<85) $highlights[] = "Hand_r_red:".COLOR_YELLOW;
		
		if($extData['left_leg']>400 || $extData['left_leg_muscle']<70) $highlights[] = "Leg_l_red:".COLOR_RED;
		else if($extData['left_leg']>200 || $extData['left_leg_muscle']<85) $highlights[] = "Leg_l_red:".COLOR_YELLOW;
		
		if($extData['right_leg']>400 || $extData['right_leg_muscle']<70) $highlights[] = "Leg_r_red:".COLOR_RED;
		else if($extData['right_leg']>200 || $extData['right_leg_muscle']<85) $highlights[] = "Leg_r_red:".COLOR_YELLOW;
		
		if($extData['all_body']>400 || $extData['all_body_muscle']<70) $highlights[] = "Body_red:".COLOR_RED;
		else if($extData['all_body']>200 || $extData['all_body_muscle']<85) $highlights[] = "Body_red:".COLOR_YELLOW;
		
	}
	
	if(count($highlights)>0) $params[] = "highlightParts=".join(",", $highlights);
	
	$params[] = "highlightOpacity=0.5";
	
	$url = "/3d/frames/man.php?".str_replace("#", "", join("&", $params));
	
	$result = [
		"url" => $url
	];
	
	return success($result);
}

//=========================================================================================

function doReportSendToEmail($visit_id) {
	return error("Не настроен SMTP-сервер для отправки писем");
}

//=========================================================================================

function doReportSendToPrinter($visit_id) {
	return error("Не настроен принтер по умолчанию");
}

//=========================================================================================

function doReportSendToMedcard($visit_id) {
	return error("Не настроена связь с ЕМИАС");
}

//=========================================================================================
//=========================================================================================
//=========================================================================================

function getVisitInfo($visit_id) {
	global $db;
	$res = $db->getData("select * from visits where __id='".$visit_id."'");
	if(count($res)<1) return false;
	else return $res[0];
}

//=========================================================================================

function getLatestImpedanceData($visit_id) {
	global $db;
	$res = $db->getData("select * from scale_data where visit_id='".$visit_id."' order by __id");
	$result = [];
	
	foreach($res as $line) {
		$result = json_decode($line['Data'], true);
		$result = $result['data'];
		if($result['bodyFatPercent']>0) break;
	}
	
	return $result;
}

//=========================================================================================

function getHeight($visit_id) {
	global $db;
	$res = $db->getData("select * from height_meter_data where visit_id='".$visit_id."'");
	$height = floatval($res[0]['Height']);
	return $height;
}

?>