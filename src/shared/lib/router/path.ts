import { ID } from 'shared/types';

export const path = {
	root: '/',
	home() {
		return path.root;
	},
	start() {
		return path.root.concat('start');
	},
	step1() {
		return path.root.concat('step-1');
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
