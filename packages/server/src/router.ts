import { Type } from '@sinclair/typebox';
import { HandlerBuilder, type AnyHandlerFn } from './HandlerBuilder';
import { ShallowMerge } from './types';

export type Routes = Record<string, AnyHandlerFn>;

export class Router<TRoutes extends Routes = {}> {
  get<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {
    const newRouter = this.clone<
      ShallowMerge<
        TRoutes,
        {
          [K in TPath]: THandlerFn;
        }
      >
    >();

    return newRouter;
  }

  post<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {}

  put<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {}

  delete<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {}

  patch<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {}

  head<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {}

  options<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {}

  trace<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {}

  connect<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {}

  all<TPath extends string, THandlerFn extends AnyHandlerFn>(
    path: TPath,
    handlerFn: THandlerFn,
  ) {}

  mount<TRouter extends AnyRouter>(
    router: TRouter,
  ): Router<ShallowMerge<TRoutes, inferRoutes<TRouter>>>;
  mount<TPath extends string, TRouter extends AnyRouter>(
    path: TPath,
    router: TRouter,
  ): Router<
    ShallowMerge<
      TRoutes,
      {
        [K in TPath]: Router<inferRoutes<TRouter>>;
      }
    >
  >;
  mount<TPath extends string, TRouter extends AnyRouter>(
    pathOrRouter: TPath | TRouter,
    maybeRouter?: TRouter,
  ): Router<ShallowMerge<TRoutes, inferRoutes<TRouter>>> {
    const newRouter = this.clone<ShallowMerge<TRoutes, inferRoutes<TRouter>>>();

    return newRouter;
  }

  private clone<TNextRoutes extends Routes>() {
    return new Router<TNextRoutes>();
  }
}

export type AnyRouter = Router<Record<string, any>>;

export type inferRoutes<T> = T extends Router<infer U> ? U : never;

const handler = new HandlerBuilder()
  .params(Type.Object({ id: Type.String() }))
  .use(async ({ ctx, next }) => {
    const vars = await next({
      test: 'test',
    });

    return vars;
  })
  .response(Type.Object({ id: Type.String() }))
  .handler(({ ctx }) => {
    const id = ctx.params.id;

    return {
      id: id,
    };
  });

const router = new Router().get('/hello', handler);

const next = new Router().mount('/api', router);
