import type { AnyContextGenericOptions } from './context';

/**
 * @internal
 *
 * Error function type.
 */
export type ErrorFn<
  TAnyContextGenericOptions extends AnyContextGenericOptions,
> = <TErrorHTTPStatus extends inferErrorHTTPStatus<TAnyContextGenericOptions>>(
  httpStatus: TErrorHTTPStatus,
  error: TAnyContextGenericOptions['schemas']['response'][TErrorHTTPStatus],
) => never;

/**
 * @internal
 *
 * Infer the HTTP status from a context generic options.
 */
export type inferErrorHTTPStatus<T> = T extends AnyContextGenericOptions
  ? keyof AnyContextGenericOptions['schemas']['response']
  : never;
