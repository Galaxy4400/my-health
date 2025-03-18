import { ID } from 'shared/types';

export const path = {
	root: '/',
	home() {
		return path.root;
	},
	admin() {
		return path.root.concat('admin');
	},
	start() {
		return path.root.concat('start');
	},
	patientData() {
		return path.root.concat('patient-data');
	},
	measure() {
		return path.root.concat('measure');
	},
	cardio() {
		return path.root.concat('cardio');
	},
	puls() {
		return path.root.concat('puls');
	},
	body() {
		return path.root.concat('body');
	},
	finish() {
		return path.root.concat('finish');
	},
	results() {
		return path.root.concat('results');
	},
	page404() {
		return path.root.concat('404');
	},
	others() {
		return path.root.concat('*');
	},
	// account: {
	// 	root() {
	// 		return path.root.concat('account');
	// 	},
	// 	id(id: ID = ':id') {
	// 		return path.account.root().concat('/', `${id}`);
	// 	},
	// 	create() {
	// 		return path.account.root().concat('/create');
	// 	},
	// 	edit(id: ID = ':id') {
	// 		return path.account.id(id).concat('/edit');
	// 	},
	// },
};
