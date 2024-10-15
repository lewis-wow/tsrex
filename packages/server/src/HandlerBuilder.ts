import { Type, type TIntersect, type TSchema } from '@sinclair/typebox';
import {
  AnyContext,
  ContextOptions,
  inferContext,
  inferContextOptions,
} from './Context';
import {
  inferContextFromMiddlewareResponse,
  MiddlewareFn,
  NextFunction,
} from './middleware';
import type { ShallowMerge } from './types';

export class HandlerBuilder<
  TContext extends ContextOptions = {
    validators: {};
    variables: {};
  },
> {
  params<TNextParams extends TSchema>(nextParams: TNextParams) {
    type ContextOptions = TContext;
    type CurrentParamsSchema = ContextOptions['validators']['params'];

    type NextParamsSchema = CurrentParamsSchema extends TSchema
      ? TIntersect<[CurrentParamsSchema, TNextParams]>
      : TNextParams;

    return new HandlerBuilder<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            ContextOptions['validators'],
            {
              params: NextParamsSchema;
            }
          >;
        }
      >
    >();
  }

  body<TNextBody extends TSchema>(nextBody: TNextBody) {
    type ContextOptions = inferContextOptions<TContext>;
    type CurrentBodySchema = ContextOptions['validators']['body'];

    type NextbodySchema = CurrentBodySchema extends TSchema
      ? TIntersect<[CurrentBodySchema, TNextBody]>
      : TNextBody;

    return new HandlerBuilder<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            ContextOptions['validators'],
            {
              body: NextbodySchema;
            }
          >;
        }
      >
    >();
  }

  query<TNextQuery extends TSchema>(nextQuery: TNextQuery) {
    type ContextOptions = inferContextOptions<TContext>;
    type CurrentQuerySchema = ContextOptions['validators']['query'];

    type NextQuerySchema = CurrentQuerySchema extends TSchema
      ? TIntersect<[CurrentQuerySchema, TNextQuery]>
      : TNextQuery;

    return new HandlerBuilder<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            ContextOptions['validators'],
            {
              query: NextQuerySchema;
            }
          >;
        }
      >
    >();
  }

  response<TNextResponse extends TSchema>(nextResponse: TNextResponse) {
    type ContextOptions = inferContextOptions<TContext>;
    type CurrentResponseSchema = ContextOptions['validators']['response'];

    type NextResponseSchema = CurrentResponseSchema extends TSchema
      ? TIntersect<[CurrentResponseSchema, TNextResponse]>
      : TNextResponse;

    return new HandlerBuilder<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            ContextOptions['validators'],
            {
              response: NextResponseSchema;
            }
          >;
        }
      >
    >();
  }

  error<TNextError extends TSchema>(nextError: TNextError) {
    type ContextOptions = inferContextOptions<TContext>;
    type CurrentErrorSchema = ContextOptions['validators']['error'];

    type NextErrorSchema = CurrentErrorSchema extends TSchema
      ? TIntersect<[CurrentErrorSchema, TNextError]>
      : TNextError;

    return new HandlerBuilder<
      ShallowMerge<
        TContext,
        {
          validators: ShallowMerge<
            ContextOptions['validators'],
            {
              error: NextErrorSchema;
            }
          >;
        }
      >
    >();
  }

  use(middlewareFn: MiddlewareFn<inferContext<TContext>>) {
    type NextVariables = Awaited<ReturnType<typeof middlewareFn>>;

    return new HandlerBuilder<
      ShallowMerge<
        TContext,
        {
          variables: ShallowMerge<TContext['variables'], NextVariables>;
        }
      >
    >();
  }

  get() {}

  post() {}

  put() {}

  delete() {}

  patch() {}

  head() {}

  options() {}

  trace() {}

  connect() {}

  all() {}
}

const handler = new HandlerBuilder().params(Type.Object({ id: Type.String() }));

const next = handler.use(async ({ ctx, next }) => {
  const vars = await next({
    test: 'test',
  });

  return vars.ok;
});
