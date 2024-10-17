/**
 * @internal
 *
 * MaybePromise is a type that represents a value that can be either a value of type T or a Promise of type T.
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * @internal
 *
 * Simplify the object structure for readability in IDE
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Simplify<T> = T extends any[] | Date ? T : { [K in keyof T]: T[K] };

/**
 * @internal
 *
 * Merge two object types shallowly.
 */
export type ShallowMerge<T extends object, U extends object> = {
  [K in keyof T]: K extends keyof U ? U[K] : T[K];
} & U;
