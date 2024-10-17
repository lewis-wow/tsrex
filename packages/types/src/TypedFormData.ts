import { Typed } from './Typed';

export class TypeFormData<TData extends { [k: string]: FormDataEntryValue }>
  extends FormData
  implements Typed<TData>
{
  $inferData: TData = undefined as unknown as TData;

  override [Symbol.iterator](): FormDataIterator<
    [keyof TData extends string ? keyof TData : never, TData[keyof TData]]
  > {
    return super.entries() as FormDataIterator<
      [keyof TData extends string ? keyof TData : never, TData[keyof TData]]
    >;
  }
  /** Returns an array of key, value pairs for every entry in the list. */
  entries(): FormDataIterator<
    [keyof TData extends string ? keyof TData : never, TData[keyof TData]]
  > {
    return super.entries() as FormDataIterator<
      [keyof TData extends string ? keyof TData : never, TData[keyof TData]]
    >;
  }
  /** Returns a list of keys in the list. */
  keys(): FormDataIterator<keyof TData extends string ? keyof TData : never> {
    return super.keys() as FormDataIterator<
      keyof TData extends string ? keyof TData : never
    >;
  }
  /** Returns a list of values in the list. */
  values(): FormDataIterator<TData[keyof TData]> {
    return super.values() as FormDataIterator<TData[keyof TData]>;
  }
}
