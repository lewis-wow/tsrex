import { Typed } from './Typed';

export class TypedRequest<
    TData,
    const TRequestInit extends RequestInit | undefined = undefined,
  >
  extends Request
  implements Typed<TData>
{
  $inferData: TData = undefined as unknown as TData;

  constructor(input: RequestInfo | URL, init?: TRequestInit) {
    super(input, init);
  }

  /**
   * Create a new TypedRequest instance with possibility to specify the data type standalone.
   *
   * This is not a standard method, but a helper method to create a new TypedRequest instance.
   */
  static create<TData>() {
    return <const TRequestInit extends RequestInit | undefined = undefined>(
      input: RequestInfo | URL,
      init?: TRequestInit,
    ) => new TypedRequest<TData, TRequestInit>(input, init);
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/json) */
  override async json(): Promise<TData> {
    return super.json();
  }

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/clone) */
  override clone(): TypedRequest<TData, TRequestInit> {
    return super.clone() as TypedRequest<TData, TRequestInit>;
  }
}
