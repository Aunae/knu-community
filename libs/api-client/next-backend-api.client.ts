import { HTTP_METHOD, HTTP_STATUS } from '../constants/http';

const baseURL = '/api';

const get = <T>(url: string): Promise<T> => {
  const configs: RequestInit = {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${baseURL}/${url}`, configs).then(handleResponse);
};

const post = <T>(url: string, data?: any): Promise<T> => {
  const configs: RequestInit = {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(`${baseURL}/${url}`, configs).then(handleResponse);
};

const handleResponse = (response: Response) => {
  return response.text().then((text) => {
    // TODO: 잘못된 json형식일 때 예외 처리
    try {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([HTTP_STATUS.UNAUTHORIZED, HTTP_STATUS.FORBIDDEN].includes(response.status)) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api-client
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    } catch {
      return null;
    }
  });
};

// Todo: add auth interceptor
export const nextBackendClient = {
  get,
  post,
};
