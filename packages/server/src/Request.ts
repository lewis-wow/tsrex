import { Static, TSchema } from '@sinclair/typebox';

export type RequestLikeOptions = {
  body?: TSchema;
  query?: TSchema;
  params?: TSchema;
};

export interface RequestLike<T extends RequestLikeOptions> extends Request {
  json: () => T['body'] extends TSchema
    ? Promise<Static<T['body']>>
    : Promise<undefined>;
  query: T['query'] extends TSchema ? Static<T['query']> : undefined;
  params: T['params'] extends TSchema ? Static<T['params']> : undefined;
}
