import { ResponseEntity } from '../response';
import { Category } from '../../../models/category';

export type CategoryResponse = ResponseEntity<Category>;
export type CategoriesResponse = ResponseEntity<Category[]>;
