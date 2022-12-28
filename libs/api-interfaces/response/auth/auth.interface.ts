import { AccessToken, AuthTokens } from '../../../models/auth';
import { ResponseEntity } from '../response';

export type GenerateAccessTokenResponse = ResponseEntity<AccessToken>;
export type GenerateTokensResponse = ResponseEntity<AuthTokens>;
