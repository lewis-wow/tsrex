import { type TIntersect } from '@sinclair/typebox';
import type { AnyContextGenericOptions } from './types/context';
import type { HandlerFn } from './types/handlerFn';
import type { MiddlewareFn } from './types/middlewareFn';
import type { AnySchema, Schema } from './types/schema';
import type { ShallowMerge } from './types/utils';

export class HandlerBuilder<
  T extends AnyContextGenericOptions = {
    variables: {};
    schemas: {
      response: {};
      params: undefined;
      body: undefined;
      query: undefined;
    };
  },
> {
  params<TNextParams extends AnySchema>(_nextParams: TNextParams) {
    type CurrentParamsSchema = T['schemas']['params'];

    type NextParamsSchema = CurrentParamsSchema extends AnySchema
      ? Schema<TIntersect<[CurrentParamsSchema, TNextParams]>>
      : TNextParams;

    type NextSchemas = ShallowMerge<
      T['schemas'],
      {
        params: NextParamsSchema;
      }
    >;

    type NextContext = ShallowMerge<
      T,
      {
        schemas: NextSchemas;
      }
    >;

    const newHandlerBuilder = this.clone<NextContext>();

    return newHandlerBuilder;
  }

  body<TNextBody extends AnySchema>(_nextBody: TNextBody) {
    type CurrentBodySchema = T['schemas']['body'];

    type NextbodySchema = CurrentBodySchema extends AnySchema
      ? Schema<TIntersect<[CurrentBodySchema, TNextBody]>>
      : TNextBody;

    type NextSchemas = ShallowMerge<
      T['schemas'],
      {
        body: NextbodySchema;
      }
    >;

    type NextContext = ShallowMerge<
      T,
      {
        schemas: NextSchemas;
      }
    >;

    const newHandlerBuilder = this.clone<NextContext>();

    return newHandlerBuilder;
  }

  query<TNextQuery extends AnySchema>(_nextQuery: TNextQuery) {
    type CurrentQuerySchema = T['schemas']['query'];

    type NextQuerySchema = CurrentQuerySchema extends AnySchema
      ? Schema<TIntersect<[CurrentQuerySchema, TNextQuery]>>
      : TNextQuery;

    type NextSchemas = ShallowMerge<
      T['schemas'],
      {
        query: NextQuerySchema;
      }
    >;

    type NextContext = ShallowMerge<
      T,
      {
        schemas: NextSchemas;
      }
    >;

    const newHandlerBuilder = this.clone<NextContext>();

    return newHandlerBuilder;
  }

  response<TNextResponse extends AnySchema>(
    nextResponse: TNextResponse,
  ): HandlerBuilder<
    ShallowMerge<
      T,
      {
        schemas: ShallowMerge<
          T['schemas'],
          {
            response: T['schemas']['response'] extends object
              ? ShallowMerge<T['schemas']['response'], { 200: TNextResponse }>
              : { 200: TNextResponse };
          }
        >;
      }
    >
  >;
  response<THTTPStatusCode extends number, TNextResponse extends AnySchema>(
    httpStatusCode: THTTPStatusCode,
    nextResponse: TNextResponse,
  ): HandlerBuilder<
    ShallowMerge<
      T,
      {
        validators: ShallowMerge<
          T['schemas'],
          {
            response: T['schemas']['response'] extends object
              ? ShallowMerge<
                  T['schemas']['response'],
                  { [K in THTTPStatusCode]: TNextResponse }
                >
              : { [K in THTTPStatusCode]: TNextResponse };
          }
        >;
      }
    >
  >;
  response<
    THTTPStatusCodeOrNextResponse extends number | AnySchema,
    TNextResponse extends AnySchema | undefined = undefined,
  >(
    _httpStatusCodeOrNextResponse: THTTPStatusCodeOrNextResponse,
    _nextResponse?: TNextResponse,
  ) {
    type CurrentResponseSchema = T['schemas']['response'];

    type ArgResponseSchema = THTTPStatusCodeOrNextResponse extends number
      ? TNextResponse extends undefined
        ? never
        : TNextResponse
      : THTTPStatusCodeOrNextResponse;

    type ArgHTTPStatusCode = THTTPStatusCodeOrNextResponse extends number
      ? THTTPStatusCodeOrNextResponse
      : 200;

    type NextResponseSchema =
      CurrentResponseSchema[ArgHTTPStatusCode] extends AnySchema
        ? Schema<
            TIntersect<
              [CurrentResponseSchema[ArgHTTPStatusCode], ArgResponseSchema]
            >
          >
        : ArgResponseSchema;

    type NextSchemas = ShallowMerge<
      T['schemas'],
      {
        response: NextResponseSchema;
      }
    >;

    type NextContext = ShallowMerge<
      T,
      {
        schemas: NextSchemas;
      }
    >;

    const newHandlerBuilder = this.clone<NextContext>();

    return newHandlerBuilder;
  }

  use<TMiddlewareFn extends MiddlewareFn<T>>(_middlewareFn: TMiddlewareFn) {
    type NextVariables = Awaited<ReturnType<TMiddlewareFn>>['inferVariables'];

    const newHandlerBuilder = this.clone<
      ShallowMerge<
        T,
        {
          variables: ShallowMerge<T['variables'], NextVariables>;
        }
      >
    >();

    return newHandlerBuilder;
  }

  handler(handlerFn: HandlerFn<T>) {
    return handlerFn;
  }

  private clone<TNext extends AnyContextGenericOptions>() {
    return new HandlerBuilder<TNext>();
  }
}
