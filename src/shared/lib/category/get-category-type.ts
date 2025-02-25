import { ID } from 'shared/types';
import { CATEGORY_TYPES } from './category-types';

export const getCategoryType = (id: ID) => CATEGORY_TYPES.find((type) => type.id === id);
