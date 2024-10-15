import type { inferValidatorValue, Validators } from './Validators';

export type ContextOptions = {
  validators: Validators;
  variables: object;
};

export type Context<out T extends ContextOptions> = {
  body: inferValidatorValue<T['validators']['body']>;
  query: inferValidatorValue<T['validators']['query']>;
  params: inferValidatorValue<T['validators']['params']>;
  variables: T['variables'];
  request: Request;
};

export type AnyContext = Context<ContextOptions>;

export type inferContextOptions<T> = T extends Context<infer U> ? U : never;

export type inferContext<T> = T extends ContextOptions ? Context<T> : never;
