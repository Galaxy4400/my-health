import { ID } from 'shared/types';
import { ACCOUNT_TYPES } from './account-types';

export const getAccountTypeImage = (typeId: ID) => ACCOUNT_TYPES.find((type) => type.id === typeId)?.icon;
