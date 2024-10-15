import { Type, type TIntersect, type TSchema } from '@sinclair/typebox';
import type {
  AnyContext,
  ContextOptions,
  inferContext,
  inferContextOptions,
} from './Context';
import type {
  inferVariablesFromMiddlewareResponse,
  MiddlewareFn,
} from './middleware';
import type { MaybePromise, ShallowMerge } from './types';
import type { inferValidatorValue, Validators } from './Validators';

export class HandlerBuilder<
  TContext extends ContextOptions = {
    validators: {};
    variables: {};
  },
> {
  private _def: {
    middlewares: MiddlewareFn<any>[];
    validators: Validators;
  } = {
    middlewares: [],
    validators: {},
  };

  params<TNextParams extends TSchema>(nextParams: TNextParams) {
    type CurrentParamsSchema = ContextOptions['validators']['params'];

    type NextParamsSchema = CurrentParamsSchema extends TSchema
      ? TIntersect<[CurrentParamsSchema, TNextParams]>
      : TNextParams;

    const newHandlerBuilder = this.clone<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            TContext['validators'],
            {
              params: NextParamsSchema;
            }
          >;
        }
      >
    >();

    const newParamsSchema = newHandlerBuilder._def.validators.params
      ? Type.Intersect([newHandlerBuilder._def.validators.params, nextParams])
      : nextParams;

    newHandlerBuilder._def.validators.params = newParamsSchema;

    return newHandlerBuilder;
  }

  body<TNextBody extends TSchema>(nextBody: TNextBody) {
    type CurrentBodySchema = ContextOptions['validators']['body'];

    type NextbodySchema = CurrentBodySchema extends TSchema
      ? TIntersect<[CurrentBodySchema, TNextBody]>
      : TNextBody;

    const newHandlerBuilder = this.clone<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            TContext['validators'],
            {
              body: NextbodySchema;
            }
          >;
        }
      >
    >();

    const newBodySchema = newHandlerBuilder._def.validators.body
      ? Type.Intersect([newHandlerBuilder._def.validators.body, nextBody])
      : nextBody;

    newHandlerBuilder._def.validators.body = newBodySchema;

    return newHandlerBuilder;
  }

  query<TNextQuery extends TSchema>(nextQuery: TNextQuery) {
    type CurrentQuerySchema = ContextOptions['validators']['query'];

    type NextQuerySchema = CurrentQuerySchema extends TSchema
      ? TIntersect<[CurrentQuerySchema, TNextQuery]>
      : TNextQuery;

    const newHandlerBuilder = this.clone<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            TContext['validators'],
            {
              query: NextQuerySchema;
            }
          >;
        }
      >
    >();

    const newQuerySchema = newHandlerBuilder._def.validators.query
      ? Type.Intersect([newHandlerBuilder._def.validators.query, nextQuery])
      : nextQuery;

    newHandlerBuilder._def.validators.query = newQuerySchema;

    return newHandlerBuilder;
  }

  response<TNextResponse extends TSchema>(nextResponse: TNextResponse) {
    type CurrentResponseSchema = TContext['validators']['response'];

    type NextResponseSchema = CurrentResponseSchema extends TSchema
      ? TIntersect<[CurrentResponseSchema, TNextResponse]>
      : TNextResponse;

    const newHandlerBuilder = this.clone<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            TContext['validators'],
            {
              response: NextResponseSchema;
            }
          >;
        }
      >
    >();

    const newResponseSchema = newHandlerBuilder._def.validators.response
      ? Type.Intersect([
          newHandlerBuilder._def.validators.response,
          nextResponse,
        ])
      : nextResponse;

    newHandlerBuilder._def.validators.response = newResponseSchema;

    return newHandlerBuilder;
  }

  error<TNextError extends TSchema>(nextError: TNextError) {
    type CurrentErrorSchema = ContextOptions['validators']['error'];

    type NextErrorSchema = CurrentErrorSchema extends TSchema
      ? TIntersect<[CurrentErrorSchema, TNextError]>
      : TNextError;

    const newHandlerBuilder = this.clone<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            TContext['validators'],
            {
              error: NextErrorSchema;
            }
          >;
        }
      >
    >();

    const newErrorSchema = newHandlerBuilder._def.validators.error
      ? Type.Intersect([newHandlerBuilder._def.validators.error, nextError])
      : nextError;

    newHandlerBuilder._def.validators.error = newErrorSchema;

    return newHandlerBuilder;
  }

  use<TMiddlewareFn extends MiddlewareFn<inferContext<TContext>>>(
    middlewareFn: TMiddlewareFn,
  ) {
    type NextVariables = inferVariablesFromMiddlewareResponse<
      Awaited<ReturnType<TMiddlewareFn>>
    >;

    const newHandlerBuilder = this.clone<
      ShallowMerge<
        TContext,
        {
          variables: ShallowMerge<TContext['variables'], NextVariables>;
        }
      >
    >();

    newHandlerBuilder._def.middlewares.push(middlewareFn);

    return newHandlerBuilder;
  }

  handler(handlerFn: HandlerFn<inferContext<TContext>>) {
    return handlerFn;
  }

  private clone<TNextContextOptions extends ContextOptions>() {
    return new HandlerBuilder<TNextContextOptions>(this._def);
  }
}

export type HandlerFn<TContext extends AnyContext> = (options: {
  ctx: TContext;
}) => MaybePromise<
  inferValidatorValue<inferContextOptions<TContext>['validators']['response']>
>;

export type AnyHandlerFn = HandlerFn<any>;
