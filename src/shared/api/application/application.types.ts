export interface Slide {
	url: string;
	type: 'image' | 'video';
	duration: number;
}

export interface MainBackground {
	image?: string;
	color?: string;
}

export interface ApplicationType {
	idleTimeout: number;
	background: MainBackground;
	slider: Slide[];
	sounds: {
		mainscreen_intro: string;
		examination_start: string;
		examination_step1: string;
		examination_step2: string;
		examination_step3: string;
	};
}

export interface ApplicationResponse {
	status: string;
	general: {
		idleTimeout: number;
		sounds: {
			mainscreen_intro: string;
			examination_start: string;
			examination_step1: string;
			examination_step2: string;
			examination_step3: string;
		};
	};
	background: MainBackground;
	slider: Slide[];
}
