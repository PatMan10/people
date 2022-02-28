/**
 * Simple deep clone function.
 *
 * @param o - object to clone
 */
export const clone = <T>(o: T) => JSON.parse(JSON.stringify(o));
