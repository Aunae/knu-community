import { ResponseEntity } from '../response';
import { CategoryWithChildren } from '../../../models/category';

export type CategoryResponse = ResponseEntity<CategoryWithChildren>;
export type CategoriesResponse = ResponseEntity<CategoryWithChildren[]>;
