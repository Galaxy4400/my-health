export const calcPage = (currentCount: number, perPage: number) => Math.ceil(currentCount / perPage) + 1;
