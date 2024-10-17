import type { TSchema } from '@sinclair/typebox';

/**
 * @internal
 *
 * Wrapper type for a Typebox schema with value infer property.
 */
export type Schema<T extends TSchema> = T;

/**
 * @internal
 *
 * Any schema type.
 */
export type AnySchema = TSchema;
