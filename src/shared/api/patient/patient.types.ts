export enum Sex {
	man = 'man',
	woman = 'woman',
}

export interface PatientType {
	sex: Sex;
	age: number;
}

// export interface AccountResponse {
// 	readonly error: string | null;
// 	readonly account: AccountType | null;
// }

// export interface AccountsResponse {
// 	readonly error: string | null;
// 	readonly accounts: AccountType[] | null;
// }
