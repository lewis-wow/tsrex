/**
 * Typed wrapper for data.
 */
export interface Typed<TData> {
  $inferData: TData;
}

/**
 * Infer the data type from a Typed wrapper.
 */
export type inferData<T> = T extends Typed<any> ? T['$inferData'] : never;
