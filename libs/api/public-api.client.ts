import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';
const mockBaseURL = 'https://jsonplaceholder.typicode.com';

const publicApiConfig: AxiosRequestConfig = {
  baseURL: mockBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

class PublicApiClient {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  get<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get<T>(url, configs).then((res) => res.data);
  }

  post<T>(url: string, body?: any, configs?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post<T>(url, body, configs).then((res) => res.data);
  }
}

export const publicApiClient = new PublicApiClient(axios.create(publicApiConfig));
