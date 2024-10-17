import type { ContextVariables } from './types/context';
import type { AnyHandlerFn, HandlerFn } from './types/handlerFn';
import type { ParamKeys, ParamKeyToSchema } from './types/params';
import type { ShallowMerge } from './types/utils';

export type Routes = Record<string, AnyHandlerFn>;

export class Router<TRoutes extends Routes = {}> {
  get<
    TPath extends string,
    THandlerFn extends HandlerFn<{
      variables: ContextVariables;
      schemas: {
        response: any;
        params: ParamKeyToSchema<ParamKeys<TPath>>;
        body: any;
        query: any;
      };
    }>,
  >(_path: TPath, _handlerFn: THandlerFn) {
    type NextRoutes = ShallowMerge<
      TRoutes,
      {
        [K in TPath]: THandlerFn;
      }
    >;

    const newRouter = this.clone<NextRoutes>();

    return newRouter;
  }

  private clone<TNextRoutes extends Routes>() {
    return new Router<TNextRoutes>();
  }
}

export type AnyRouter = Router<Record<string, any>>;

export type inferRoutes<T> = T extends Router<infer U> ? U : never;
