import { ResponseEntity } from '../response';
import { Article } from '../../../models/article';

export type ArticleResponse = ResponseEntity<Article>;
export type ArticlesResponse = ResponseEntity<Article[]>;
