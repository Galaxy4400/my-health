import { ID } from 'shared/types';
import { CATEGORY_TYPES } from './category-types';

export const getCategoryTypeName = (id: ID) => CATEGORY_TYPES.find((type) => type.id === id)?.name;
