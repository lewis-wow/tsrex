import type { AnyContextGenericOptions, ContextVariables } from './context';
import type { HandlerOptions } from './handlerFn';
import type { TypedResponse } from './typedResponse';
import type { MaybePromise, ShallowMerge, Simplify } from './utils';

/**
 * @internal
 *
 * Middleware function type.
 */
export type MiddlewareFn<
  TContextGenericOptions extends AnyContextGenericOptions,
> = (
  opts: Simplify<
    HandlerOptions<TContextGenericOptions> & {
      next: NextFn<TContextGenericOptions>;
    }
  >,
) => MaybePromise<ReturnType<NextFn<TContextGenericOptions>>>;

/**
 * @internal
 *
 * Next function type.
 */
export type NextFn<TContextGenericOptions extends AnyContextGenericOptions> = <
  TVariables extends ContextVariables = {},
>(
  variables?: TVariables,
) => MaybePromise<
  TypedResponse<{
    data: TContextGenericOptions['schemas'];
    responseInit: ResponseInit;
    variables: ShallowMerge<TContextGenericOptions['variables'], TVariables>;
  }>
>;
