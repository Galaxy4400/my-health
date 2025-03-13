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
}

export interface ApplicationResponse {
	status: string;
	general: {
		idleTimeout: number;
	};
	background: MainBackground;
	slider: Slide[];
}
