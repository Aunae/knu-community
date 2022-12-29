import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/tokens';
import { authService } from '../services/auth/token.service';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';
const authApiConfig: AxiosRequestConfig = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

class AuthApiClient {
  constructor(private readonly axiosInstance: AxiosInstance) {
    this.setRequestInterceptors();
    this.setResponseInterceptors();
  }

  private setRequestInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        config.headers!.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
        return config;
      },
      (error) => error,
    );
  }

  private setResponseInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          const refreshToken = localStorage.getItem(REFRESH_TOKEN);

          if (refreshToken) {
            try {
              const { data } = await authService.regenerateAccessToken(refreshToken);
              localStorage.setItem(ACCESS_TOKEN, data.accessToken);

              // 토큰 재발급 이후 요청 재시도
              return this.axiosInstance(error.config);
            } catch (e) {
              // 토큰 재발급 실패
              /** Todo: handle unauthorized */
              console.error(e);
            }
          } else {
            // 리프레쉬 토큰 없는 경우
            /** Todo: handle unauthorized */
            console.error('리프레쉬 토큰이 없음.');
          }
        }
        return Promise.reject(error);
      },
    );
  }

  get<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get<T>(url, configs).then((res) => res.data);
  }

  post<T>(url: string, body?: any, configs?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post<T>(url, body, configs).then((res) => res.data);
  }
}

export const authApiClient = new AuthApiClient(axios.create(authApiConfig));
