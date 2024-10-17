import type { TObject, TString, TUndefined } from '@sinclair/typebox';

/**
 * @internal
 */
type ParamKeyName<NameWithPattern> =
  NameWithPattern extends `${infer Name}{${infer Rest}`
    ? Rest extends `${infer _Pattern}?`
      ? `${Name}?`
      : Name
    : NameWithPattern;

/**
 * @internal
 */
type ParamKey<Component> = Component extends `:${infer NameWithPattern}`
  ? ParamKeyName<NameWithPattern>
  : never;

/**
 * @internal
 */
export type ParamKeys<Path> = Path extends `${infer Component}/${infer Rest}`
  ? ParamKey<Component> | ParamKeys<Rest>
  : ParamKey<Path>;

/**
 * @internal
 */
export type ParamKeyToRecord<T extends string> = T extends `${infer R}?`
  ? Record<R, string | undefined>
  : { [K in T]: string };

/**
 * @internal
 */
export type ParamKeyToSchema<T extends string> = T extends `${infer R}?`
  ? TObject<Record<R, TString | TUndefined>>
  : TObject<{ [K in T]: TString }>;
