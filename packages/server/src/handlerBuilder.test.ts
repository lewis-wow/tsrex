import { Type } from '@sinclair/typebox';
import { HandlerBuilder } from './HandlerBuilder';

export const testBuilder = new HandlerBuilder();

testBuilder
  .params(Type.Object({ a: Type.String() }))
  .use(({ ctx, next }) => {
    return next({ b: 'b' as const });
  })
  .handler(({ ctx, error }) => {
    ctx.params;

    ctx.variables;
  });
