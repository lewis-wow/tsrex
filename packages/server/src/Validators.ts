import { Static, TSchema } from '@sinclair/typebox';

export type Validators = {
  params?: TSchema;
  body?: TSchema;
  query?: TSchema;
  response?: TSchema;
  error?: TSchema;
};

export type inferValidatorValue<T extends TSchema | undefined> =
  T extends TSchema ? Static<T> : undefined;
