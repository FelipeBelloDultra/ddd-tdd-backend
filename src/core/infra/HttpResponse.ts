export interface IHttpResponse {
  ok: boolean;
  statusCode: number;
  body: unknown;
}

export class HttpResponse {
  public static ok<T>(dto?: T): IHttpResponse {
    return {
      ok: true,
      statusCode: 200,
      body: dto,
    };
  }

  public static created(): IHttpResponse {
    return {
      ok: true,
      statusCode: 201,
      body: undefined,
    };
  }

  public static clientError(error: Error): IHttpResponse {
    return {
      ok: false,
      statusCode: 400,
      body: {
        error: error.message,
      },
    };
  }

  public static unauthorized(error: Error): IHttpResponse {
    return {
      ok: false,
      statusCode: 401,
      body: {
        error: error.message,
      },
    };
  }

  public static forbidden(error: Error): IHttpResponse {
    return {
      ok: false,
      statusCode: 403,
      body: {
        error: error.message,
      },
    };
  }

  public static notFound(error: Error): IHttpResponse {
    return {
      ok: false,
      statusCode: 404,
      body: {
        error: error.message,
      },
    };
  }

  public static fail(error: Error): IHttpResponse {
    console.log(error);

    return {
      ok: false,
      statusCode: 500,
      body: {
        error: error.message,
      },
    };
  }
}
