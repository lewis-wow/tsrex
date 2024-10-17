import type { AnySchema } from './schema';
import type { inferValidationSchemaValue } from './validation';

/**
 * @internal
 *
 * Request context type.
 */
export interface Context<T extends AnyContextGenericOptions> {
  request: Request;
  params: inferValidationSchemaValue<T['schemas']['params']>;
  body: inferValidationSchemaValue<T['schemas']['body']>;
  query: inferValidationSchemaValue<T['schemas']['query']>;
  variables: T['variables'];
}

/**
 * @internal
 *
 * Context options type.
 */
export type AnyContextGenericOptions = {
  variables: ContextVariables;
  schemas: ContextSchemas;
};

/**
 * @internal
 *
 * Context schemas type.
 */
export type ContextSchemas = {
  response: ResponseSchema;
  params: ParamsSchema;
  body: BodySchema;
  query: QuerySchema;
};

/**
 * @internal
 *
 * Context variables type.
 */
export type ContextVariables = object;

/**
 * @internal
 *
 * Response schema type.
 */
export type ResponseSchema = Record<number, AnySchema>;

/**
 * @internal
 *
 * Params schema type.
 */
export type ParamsSchema = AnySchema | undefined;

/**
 * @internal
 *
 * Body schema type.
 */
export type BodySchema = AnySchema | undefined;

/**
 * @internal
 *
 * Query schema type.
 */
export type QuerySchema = AnySchema | undefined;
