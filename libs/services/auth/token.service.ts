import { authApiClient } from '../../api/auth-api.client';
import { GenerateAccessTokenResponse } from '../../api-interfaces/response/auth/auth.interface';

export const regenerateAccessToken = (refreshToken: string): Promise<GenerateAccessTokenResponse> => {
  return authApiClient.post<GenerateAccessTokenResponse>('/refresh', { refreshToken });
};
