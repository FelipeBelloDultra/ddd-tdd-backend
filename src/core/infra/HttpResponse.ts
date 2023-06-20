export interface IHttpResponse {
  statusCode: number;
  body: {
    data?: unknown;
    error?: {
      errors?: {
        [key: string]: string[];
      };
      message: string;
    };
  };
}

export class HttpResponse {
  public static ok<T>(dto?: T): IHttpResponse {
    return {
      statusCode: 200,
      body: {
        data: dto,
        error: undefined,
      },
    };
  }

  public static created(): IHttpResponse {
    return {
      statusCode: 201,
      body: {
        data: undefined,
        error: undefined,
      },
    };
  }

  public static clientError(error: Error): IHttpResponse {
    return {
      statusCode: 400,
      body: {
        data: undefined,
        error: {
          message: error.message,
          errors: {},
        },
      },
    };
  }

  public static unauthorized(error: Error): IHttpResponse {
    return {
      statusCode: 401,
      body: {
        data: undefined,
        error: {
          message: error.message,
          errors: {},
        },
      },
    };
  }

  public static forbidden(error: Error): IHttpResponse {
    return {
      statusCode: 403,
      body: {
        data: undefined,
        error: {
          message: error.message,
          errors: {},
        },
      },
    };
  }

  public static notFound(error: Error): IHttpResponse {
    return {
      statusCode: 404,
      body: {
        data: undefined,
        error: {
          message: error.message,
          errors: {},
        },
      },
    };
  }

  public static fail(error: Error): IHttpResponse {
    console.log(error);

    return {
      statusCode: 500,
      body: {
        data: undefined,
        error: {
          message: error.message,
          errors: {},
        },
      },
    };
  }
}
