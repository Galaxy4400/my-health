import { ID } from 'shared/types';
import { ACCOUNT_TYPES } from './account-types';

export const getAccountTypeName = (typeId: ID) => ACCOUNT_TYPES.find((type) => type.id === typeId)?.name;
