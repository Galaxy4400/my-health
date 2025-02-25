import { ID } from '../common';

export interface LocationFromLocation {
	state?: { from: Location };
}

export interface LocationFromAccount {
	state?: { from: { accountId: ID } };
}
