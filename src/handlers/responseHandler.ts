import { Response } from 'express';

export default class ResponseHandler<T> {
  private data?: T;

  private error?: string;

  constructor(params: { data?: T; error?: string }) {
    this.data = params.data;
    this.error = params.error;
  }

  static async handleCatching<Y>(expression: () => Promise<Y>): Promise<ResponseHandler<Y>> {
    try {
      const data = await expression();
      return new ResponseHandler({ data });
    } catch (exception) {
      const error = exception instanceof Error ? exception.message : exception;
      return new ResponseHandler({ error });
    }
  }

  handle(response: Response, successStatus = 200): Response {
    if (this.error) {
      response.status(500).json({ error: this.error }).end();
    } else if (this.data == null) {
      response.status(404).end();
    } else {
      response.status(successStatus).json(this.data).end();
    }

    return response;
  }
}
