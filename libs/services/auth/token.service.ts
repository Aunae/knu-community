import { authApiClient } from '../../api-client/auth-api.client';
import { GenerateAccessTokenResponse } from '../../api-interfaces/response/auth/auth.interface';

const regenerateAccessToken = (refreshToken: string): Promise<GenerateAccessTokenResponse> => {
  return authApiClient.post<GenerateAccessTokenResponse>('/refresh', { refreshToken });
};

export const authService = { regenerateAccessToken };
