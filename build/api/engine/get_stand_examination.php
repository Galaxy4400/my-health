<?

function processExamination($request) {
	switch($request['subaction']) {
		
		case "start":
				return doExaminationStart($request);
				break;
				
		case "step":
				return doExaminationStep($request);
				break;
		
		default:
				return getExaminationEmpty();
				break;
	}
}

//=========================================================================================

function getExaminationEmpty() {
	return success();
}

//=========================================================================================

function doExaminationStart($request) {
	global $db, $db_remote;
	
	$error = false;
	
	if($request['patient']['gender']==""||$request['patient']['age']<1) return error("Не заполнены необходимые данные");
	
	else {
		$response = [];
		$visit_id = $db->query("insert into visits set
			__ctime='".timeStr()."',
			hasReport = '0',
			Gender='".$db->escape($request['patient']['gender'])."',
			Age='".intval($request['patient']['age'])."',
			Diseases='".$db->escape(json_encode($request['patient']['diseases']))."'");
			
		$response["visit_id"] = $visit_id;
		
		$db->query("delete from scale_data where visit_id=0");
		$db_remote->query("delete from scale_data where visit_id=0");
		
		return success($response);
	}	
}

//=========================================================================================

function doExaminationStep($request) {
	global $db;
	$request['visit_id'] = intval($request['visit_id']);
	if(!validateVisit($request['visit_id']))  return error("Некорректный идентификатор визита");
	
	switch($request['step']) {
		case "1":
			return doExaminationStep1($request);
			break;
			
		case "2":
			return doExaminationStep2($request);
			break;
			
		case "3":
			return doExaminationStep3($request);
			break;
			
		default:
			return error("некорректный шаг исследования");
			break;
	}
}

//=========================================================================================

function getExaminationMeasureHeight($visit_id) {
	global $db, $debug;
	
	$debug[] = "measuring height";
	
	$height = getStandDeviceHeightMeterData();

	$res = $db->getData("select __id from height_meter_data where visit_id='".$visit_id."'");
	if($res[0]['Height']>0) $height = $res[0]['Height']; // we already have valid data from the previous run
	else {
	
		$debug[] = "got height: ";
		$debug[] = $height;
	
		$do_not_delete_old_data = false;
	
		// if we get an error while measuring height for the first time, let's try again
		// if we get a second error, let's skip this step
		if($height<1) {
			$debug[] = "no data received";
			$res = $db->getData("select __id from height_meter_data where visit_id='".$visit_id."'");
			if(count($res)>0) {
				$debug[] = "we already have stored data";
				$do_not_delete_old_data = true;
				$height = floatval($res[0]['Height']);
			} else {
				$debug[] = "first time error, let's show message";
				$height = error("<b>Некорректные показатели ростомера</b><p>Пожалуйста, встаньте на весы и попробуйте ещё раз.</p><p>Если не получится, мы пропустим этот шаг.</p>");
			}
		} else {
			$debug[] = "data received";
		}
	
		if(!$do_not_delete_old_data) {
			$db->query("delete from height_meter_data where visit_id='".$visit_id."'");
			$db->query("insert into height_meter_data set
				__ctime='".timeStr()."',
				Height='".(is_array($height)? 0: round(floatval($height), 2))."',
				visit_id='".$visit_id."'");
		}
	}

	return $height;
}

//=========================================================================================

function getExaminationMeasureImpedance($visit_id) {
	global $db, $debug;
	
	$debug[] = "measuring impedance";
	
	// get height, age and gender, pass it to scale
	$height = getHeight($visit_id);
	if($height<1) $height = 180;
	
	$vres = $db->getData("select * from visits where __id='".$visit_id."'");
	$gender = $vres[0]['Gender'];
	$age = $vres[0]['Age'];
	
	$debug[] = "applying data for scale: gender=$gender; age=$age; height=$height";
	
	setVisitorDataForImpedance($gender, $age, $height);
	
	
	// Get impedance data and check if it is complete
	$data = getStandDeviceImpedanceData($visit_id);
	
	$debug[] = "got impedance data:";
	$debug[] = $data;
	
	$do_not_delete_old_data = false;
	
	// if we get an error while measuring height for the first time, let's try again
	// if we get a second error, let's skip this step
	if($data['isComplete']<1) {
		$debug[] = "data is not complete";
		$res = $db->getData("select __id from scale_data where visit_id='".$visit_id."'");
		if(count($res)>0) {
			$debug[] = "we already have stored data";
			$do_not_delete_old_data = true;
			$result = null;
		}
		else {
			$debug[] = "first time error, let's show message";
			$result = error("<b>Нет контакта электродов с кожей</b><p>Сделайте, пожалуйста, следующее:</p>
				<ol><li>сойдите с весов,</li>
				<li>подождите три секунды и встаньте на них заново <b>босиком</b>,</li>
				<li>положите руки на электроды,</li>
				<li>нажмите \"ОК\" и затем \"Измерить\".</li></ol>
				<p>Если не получится, мы пропустим этот шаг.</p>");
		}
	} else {
		$debug[] = "received complete data";
		$result = null;
	}
	
	if(!$do_not_delete_old_data) {
		$db->query("delete from scale_data where visit_id='".$visit_id."'");
		$db->query("insert into scale_data set
			visit_id='".$visit_id."',
			DeviceAddress='".$data['DeviceAddress']."',
			__ctime='".timeStr()."',
			IP='".$_SERVER['REMOTE_ADDR']."',
			isComplete = '".intval($data['isComplete'])."',
			Data='".$db->escape($data['Data'])."'");
	}
	
	return $result;
}

//=========================================================================================

function setVisitorDataForImpedance($gender, $age, $height) { // this data will be passed to smart scale for better accuracy
	updateSystemSettings("gender", $gender);
	updateSystemSettings("age", $age);
	updateSystemSettings("height", $height);
}

//=========================================================================================

function doExaminationStep1($request) { // height, weight, impedance
	global $db, $debug;
	
	// should look for the last record in scale_data and assign visit_id to it
	$scale_data_id = 0;
	$db->query("update scale_data set visit_id='".$request['visit_id']."' where __id='".$scale_data_id."'");
	$height = getExaminationMeasureHeight($request['visit_id']);

 	$debug[] = "got height result:";
	$debug[] = $height;

	if(!is_numeric($height)) return $height; // some error while measuring height, let's show it
	
	$result = getExaminationMeasureImpedance($request['visit_id']);
	if($result!=null) return $result; // some error while measuring impedance, let's show it
		
	return success();
}

//=========================================================================================

function getExaminationMeasurePulseOximeter($visit_id) {
	global $db;
	
	global $debug;
	$debug[] = "measuring pulse oximeter data";
	
	$res = $db->getData("select * from pulseoximeter_data where visit_id='".$visit_id."'");
	if($res[0]['HeartRate_avg']>0) $result = null; // we already have valid data from the previous run
	else {

		$data = getStandDevicePulseOximeterData();
	
		$debug[] = "got data:";
		$debug[] = $data;
		$do_not_delete_old_data = false;
	
		// if we get an error while measuring height for the first time, let's try again
		// if we get a second error, let's skip this step
		if(!$data) {
			$debug[] = "no data received";
			$res = $db->getData("select * from pulseoximeter_data where visit_id='".$visit_id."'");
			if(count($res)>0) {
				$do_not_delete_old_data = true;
				$debug[] = "we already have stored data";
				$result = null;
			}
			else {
				$debug[] = "first time error, showing message";
				$result = error("<b>Палец не в пульсоксиметре</b><p>Пожалуйста, вставьте указательный палец любой руки в пульсоксиметр и повторите измерение.</p><p>Если не получится, мы пропустим этот шаг.</p>");
			}
		} else {
			$debug[] = "got data";
			$result = null;
		}
	
		if(!$do_not_delete_old_data) {
			$db->query("delete from pulseoximeter_data where visit_id='".$visit_id."'");
			$db->query("insert into pulseoximeter_data set
				__ctime='".timeStr()."',
				SpO2='".intval($data['avgsaturation'])."',
				HeartRate_avg='".intval($data['avgheartrate'])."',
				HeartRate_min='".intval($data['minheartrate'])."',
				HeartRate_max='".intval($data['maxheartrate'])."',
				visit_id='".$visit_id."'");
		}
	}

	return $result;
}

function getExaminationMeasureBloodPressure($visit_id) {
	global $db, $debug;
	
	$debug[] = "measuring blood pressure data";
	
	$data = getStandDeviceBPMData();
	
	$debug[] = "got data:";
	$debug[] = $data;
	
	$do_not_delete_old_data = false;
	
	// if we get an error while measuring height for the first time, let's try again
	// if we get a second error, let's skip this step
	if(!$data) {
		$debug[] = "no data received";
		$res = $db->getData("select __id from bpm_data where visit_id='".$visit_id."'");
		if(count($res)>0) {
			$debug[] = "we already have stored data";
			$do_not_delete_old_data = true;
			$result = null;
		}
		else {
			$debug[] = "first time error, showing message";
			$result = error("<b>Рука не в тонометре</b><p>Пожалуйста, вставьте любую руку в тонометр и повторите измерение.</p><p>Если не получится, мы пропустим этот шаг.</p>");
		}
	} else {
		$debug[] = "got data";
		$result = null;
	}
	
	if(!$do_not_delete_old_data) {
		$db->query("delete from bpm_data where visit_id='".$visit_id."'");
		$db->query("insert into bpm_data set
			__ctime='".timeStr()."',
			Systolic='".intval($data['Systolic'])."',
			Diastolic='".intval($data['Diastolic'])."',
			HeartRate='".intval($data['Pulse Rate'])."',
			visit_id='".$visit_id."'");
	}
	
	return $result;
}

//=========================================================================================


function doExaminationStep2($request) { // pulseoximeter
	global $db, $debug;
	
	$debug[] = "examination, step2";
	
	$result = getExaminationMeasurePulseOximeter($request['visit_id']);
	if($result!=null) return $result; // some error while measuring pulseoximeter data, let's show it
	
	return success();
}

//=========================================================================================


function doExaminationStep3($request) { // blood pressure
	global $db, $debug;
	
	$debug[] = "examination, step3";
		
	$result = getExaminationMeasureBloodPressure($request['visit_id']);
	if($result!=null) return $result; // some error while measuring impedance, let's show it
		
	return success();
}

?>