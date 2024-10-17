import type {
  AnyContextGenericOptions,
  Context,
  ContextVariables,
} from './context';
import type { ErrorFn } from './errorFn';
import type { TypedResponse } from './typedResponse';
import type { MaybePromise } from './utils';

/**
 * @internal
 *
 * Handler function type.
 */
export type HandlerFn<TContextGenericOptions extends AnyContextGenericOptions> =
  (opts: HandlerOptions<TContextGenericOptions>) => MaybePromise<
    TypedResponse<{
      data: TContextGenericOptions['schemas'];
      responseInit: ResponseInit;
      variables: ContextVariables;
    }>
  >;

export type AnyHandlerFn = HandlerFn<AnyContextGenericOptions>;

/**
 * @internal
 *
 * Handler options type.
 */
export type HandlerOptions<
  TAnyContextGenericOptions extends AnyContextGenericOptions,
> = {
  ctx: Context<TAnyContextGenericOptions>;
  error: ErrorFn<TAnyContextGenericOptions>;
};
