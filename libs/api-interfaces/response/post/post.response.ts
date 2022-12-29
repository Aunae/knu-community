import { ResponseEntity } from '../response';
import { PostWithCategory } from '../../../models/post';
import { Post } from '@prisma/client';

export type PostResponse = ResponseEntity<Post | PostWithCategory>;
export type PostsResponse = ResponseEntity<PostWithCategory[]>;
