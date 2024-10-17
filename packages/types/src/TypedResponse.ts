import { Typed } from './Typed';

export class TypedResponse<
    TData,
    const TResponseInit extends ResponseInit | undefined = undefined,
  >
  extends Response
  implements Typed<TData>
{
  $inferData: TData = undefined as unknown as TData;

  constructor(body: BodyInit, init?: TResponseInit) {
    super(body as BodyInit, init);
  }

  static override json<
    TData extends object | null,
    const TResponseInit extends ResponseInit | undefined = undefined,
  >(data: TData, init?: TResponseInit): TypedResponse<TData, TResponseInit> {
    return super.json(JSON.stringify(data), init) as TypedResponse<
      TData,
      TResponseInit
    >;
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
  ): TypedResponse<
    null,
    {
      status: TStatus;
      headers: {
        Location: string;
      };
    }
  > {
    return super.redirect(url, status) as TypedResponse<
      null,
      {
        status: TStatus;
        headers: {
          Location: string;
        };
      }
    >;
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/json_static) */
  override async json(): Promise<TData> {
    return super.json();
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/clone) */
  override clone(): TypedResponse<TData, TResponseInit> {
    return super.clone() as TypedResponse<TData, TResponseInit>;
  }
}
