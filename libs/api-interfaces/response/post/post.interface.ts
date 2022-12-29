import { ResponseEntity } from '../response';
import { PostWithCategory } from '../../../models/post';

export type PostResponse = ResponseEntity<PostWithCategory>;
export type PostsResponse = ResponseEntity<PostWithCategory[]>;
