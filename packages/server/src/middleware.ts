import { TSchema } from '@sinclair/typebox';
import type { AnyContext, Context } from './Context';
import { JsonSchemaParser } from './jsonSchemaParser';
import { PtsqError } from './ptsqError';
import { ShallowMerge } from './types';
import type { ResolverType, Simplify } from './types';

/**
 * @internal
 */
export type NextFunction<TContext extends AnyContext> = <
  TNextVariables extends object,
>(
  variables?: TNextVariables,
) => Promise<
  MiddlewareResponse<
    Simplify<ShallowMerge<TContext['variables'], TNextVariables>>
  >
>;

/**
 * @internal
 */
export type MiddlewareFn<TContext extends AnyContext> = (options: {
  ctx: Simplify<TContext>;
  next: NextFunction<TContext>;
}) => ReturnType<NextFunction<TContext>>;

export interface MiddlewareResponse<_TVariables extends object>
  extends Response {}

export type inferVariablesFromMiddlewareResponse<T> =
  T extends MiddlewareResponse<infer Variables> ? Variables : never;

/**
 * The middleware class container
 */
export class Middleware<TArgs, TContext extends Context> {
  _def: {
    middlewareFunction: MiddlewareFunction<TArgs, TContext>;
    argsSchema: TSchema | undefined;
    parser: JsonSchemaParser;
  };

  constructor(middlewareOptions: {
    argsSchema: TSchema | undefined;
    middlewareFunction: MiddlewareFunction<TArgs, TContext>;
    parser: JsonSchemaParser;
  }) {
    this._def = middlewareOptions;
  }

  /**
   * @internal
   *
   * Calls all middlewares recursivelly depends on the `next` function call.
   *
   * The last middleware that is called is always the resolve function.
   */
  static async recursiveCall({
    ctx,
    meta,
    index,
    middlewares,
  }: {
    ctx: Context;
    meta: MiddlewareMeta;
    index: number;
    middlewares: AnyMiddleware[];
  }): Promise<AnyMiddlewareResponse> {
    try {
      const argsSchema = middlewares[index]._def.argsSchema;

      let middlewareInput = meta.input;

      if (argsSchema !== undefined) {
        const parseResult = await middlewares[index]._def.parser.decode({
          value: meta.input,
          schema: argsSchema,
        });

        if (!parseResult.ok)
          throw new PtsqError({
            code: 'PTSQ_VALIDATION_FAILED',
            message: 'Args validation error.',
            cause: parseResult.errors,
          });

        middlewareInput = parseResult.data;
      }

      const response = await middlewares[index]._def.middlewareFunction({
        input: middlewareInput,
        meta: meta,
        ctx: ctx,
        next: ((options) => {
          return Middleware.recursiveCall({
            ctx: { ...ctx, ...options?.ctx },
            meta: options?.meta ?? meta,
            index: index + 1,
            middlewares: middlewares,
          });
        }) as NextFunction<Context>,
      });

      return response;
    } catch (error) {
      return Middleware.createFailureResponse({
        error: PtsqError.isPtsqError(error)
          ? error
          : new PtsqError({
              code: 'INTERNAL_SERVER_ERROR',
              cause: error,
            }),
      });
    }
  }

  /**
   * Creates a success response with correct structure
   */
  static createSuccessResponse<
    TContext extends object = object,
  >(responseFragment: { data: unknown }): MiddlewareResponse<TContext> {
    return {
      ok: true,
      ...responseFragment,
    };
  }

  /**
   * Creates a failure response with correct structure
   */
  static createFailureResponse<
    TContext extends object = object,
  >(responseFragment: { error: PtsqError }): MiddlewareResponse<TContext> {
    return {
      ok: false,
      ...responseFragment,
    };
  }
}
