export interface IHttpResponse {
  ok: boolean;
  statusCode: number;
  body: any;
}

export function ok<T>(dto?: T): IHttpResponse {
  return {
    ok: true,
    statusCode: 200,
    body: dto,
  };
}

export function created(): IHttpResponse {
  return {
    ok: true,
    statusCode: 201,
    body: undefined,
  };
}

export function clientError(error: Error): IHttpResponse {
  return {
    ok: false,
    statusCode: 400,
    body: {
      error: error.message,
    },
  };
}

export function unauthorized(error: Error): IHttpResponse {
  return {
    ok: false,
    statusCode: 401,
    body: {
      error: error.message,
    },
  };
}

export function forbidden(error: Error): IHttpResponse {
  return {
    ok: false,
    statusCode: 403,
    body: {
      error: error.message,
    },
  };
}

export function notFound(error: Error): IHttpResponse {
  return {
    ok: false,
    statusCode: 404,
    body: {
      error: error.message,
    },
  };
}

export function fail(error: Error): IHttpResponse {
  console.log(error);

  return {
    ok: false,
    statusCode: 500,
    body: {
      error: error.message,
    },
  };
}
