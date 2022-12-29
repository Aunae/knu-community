import { ResponseEntity } from '../response';
import { UserWithoutPassword } from '../../../models/user';

export type UserResponse = ResponseEntity<UserWithoutPassword>;
export type UsersResponse = ResponseEntity<UserWithoutPassword[]>;
