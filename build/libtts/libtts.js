var ttsFragmentCount;
var ttsReadyCount;
var ttsCurrentFragment;

//=================================================================================

function ttsSay(phrase, voice, speed) {
	console.log("TTS Say", "Phrase:", phrase, "Voice: "+voice, "Speed: "+speed);
	if(phrase.length<1) {
		console.error("TTS ERROR: phrase too short");
		return false;
	}
	if(voice=="") {
		console.error("TTS ERROR: voice not specified");
		return false;
	}
	if(speed<0.1||speed>3) {
		console.error("TTS ERROR: invalid speed value");
		return false;
	}
	
	ttsFragmentCount = phrase.length;
	ttsReadyCount = 0;

	if (document.getElementById("ttsSoundContainer")) {
		document.getElementById("ttsSoundContainer").remove();
		console.log('deleting preexisting element to avoid errors in playing audio');
	}
	
	var soundContainer = document.createElement("div");
	soundContainer.id="ttsSoundContainer";
	soundContainer.style.cssText = "display: none";
	
	for(var i=0; i<ttsFragmentCount; i++) {
		var audio = document.createElement("audio");
		audio.id = "ttsAudio"+i;
		audio.src="tts.php?phrase="+phrase[i]+"&voice="+voice+"&speed="+speed;
		audio.loop = false;
		audio.preload = "auto";
		audio.pause();
		audio.addEventListener("canplaythrough", function() {
			console.log("loaded fragment for "+this.id);
			ttsReadyCount++;
			ttsTryToSayFullPhrase();
		});
		audio.addEventListener("ended", function() {
			ttsSayNextFragment();
		});
		soundContainer.appendChild(audio);
	}
	
	document.body.appendChild(soundContainer);
	
}

//=================================================================================

function ttsTryToSayFullPhrase() {
	if(ttsReadyCount==ttsFragmentCount) {
		console.log("can say full phrase");
		ttsCurrentFragment = -1;
		ttsSayNextFragment();
	}
}

//=================================================================================

function ttsSayNextFragment() {
	ttsCurrentFragment++;
	if(ttsCurrentFragment>=0&&ttsCurrentFragment<=ttsFragmentCount-1) {
		console.log("saying fragment "+ttsCurrentFragment);
		var audio = document.getElementById("ttsAudio"+ttsCurrentFragment);
		audio.currentTime = 0;
		audio.play();
	} else {
		console.log("phrase finished");
		document.getElementById("ttsSoundContainer").remove();
	}
}