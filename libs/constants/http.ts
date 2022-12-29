export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
};

export type HTTP_METHOD = typeof HTTP_METHOD[keyof typeof HTTP_METHOD];

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

export type HTTP_STATUS = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

export const APPLICATION_JSON = 'application/json';
