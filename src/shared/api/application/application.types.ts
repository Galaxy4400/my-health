export interface Slide {
	url: string;
	type: 'image' | 'video';
	duration: number;
}

export interface MainBackground {
	image?: string;
	color?: string;
}

export interface Sounds {
	mainscreen_intro: string;
	examination_start: string;
	examination_step1: string;
	examination_step2: string;
	examination_step3: string;
	examination_examenation: string;
}

export interface Devices {
	heightMeter: boolean;
	questionnaire: boolean;
}

export interface ApplicationType {
	idleTimeout: number;
	background: MainBackground;
	slider: Slide[];
	sounds: Sounds;
	devices: Devices;
}

export interface ApplicationResponse {
	status: string;
	general: {
		idleTimeout: number;
		sounds: Sounds;
		devices: Devices;
	};
	background: MainBackground;
	slider: Slide[];
}
