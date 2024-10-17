import type { AnySchema } from './schema';

/**
 * @internal
 *
 * Validation schema type.
 */
export type ValidationSchema = AnySchema | undefined;

/**
 * @internal
 *
 * Infer the value type from a validation schema.
 */
export type inferValidationSchemaValue<T extends ValidationSchema> =
  T extends AnySchema ? T['static'] : undefined;
