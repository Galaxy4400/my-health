export interface ErrorType {
	readonly message: string;
	readonly response: {
		readonly status?: string;
	};
}
