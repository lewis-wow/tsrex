import type { ContextVariables } from './context';

export type TypeResponseGenericOptions = {
  data: any;
  variables: ContextVariables;
  responseInit: ResponseInit | undefined;
};

export class TypedResponse<
  T extends TypeResponseGenericOptions,
> extends Response {
  /**
   * Infer the data type from a TypedResponse wrapper.
   *
   * Type only.
   */
  inferData: T['data'] = {} as T['data'];

  /**
   * Infer the variables type from a TypedResponse wrapper.
   *
   * Type only.
   */
  inferVariables: T['variables'] = {} as T['variables'];

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/json_static) */
  static override json<
    TData extends object | null,
    const TResponseInit extends ResponseInit | undefined = undefined,
  >(
    /**
     * A JSON object to be returned.
     */
    data: TData,
    init?: TResponseInit,
  ): TypedResponse<{
    data: TData;
    responseInit: TResponseInit;
    variables: ContextVariables;
  }> {
    return super.json(JSON.stringify(data), init) as TypedResponse<{
      data: TData;
      responseInit: TResponseInit;
      variables: ContextVariables;
    }>;
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/redirect_static) */
  static override redirect<TStatus extends 301 | 302 | 303 | 307 | 308 = 302>(
    /**
     * The URL that the new response is to originate from.
     */
    url: string | URL,
    /**
     * An optional number indicating the status code for the response: one of 301, 302, 303, 307, or 308. If omitted, 302 Found is used by default.
     */
    status?: TStatus,
  ): TypedResponse<{
    data: null;
    responseInit: {
      status: TStatus;
      headers: {
        Location: string;
      };
    };
    variables: ContextVariables;
  }> {
    return super.redirect(url, status) as TypedResponse<{
      data: null;
      responseInit: {
        status: TStatus;
        headers: {
          Location: string;
        };
      };
      variables: ContextVariables;
    }>;
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/json_static) */
  override async json(): Promise<T['data']> {
    return super.json() as Promise<T['data']>;
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/clone) */
  override clone(): TypedResponse<T> {
    return super.clone() as TypedResponse<T>;
  }
}
