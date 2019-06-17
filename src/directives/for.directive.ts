/**
 * Adds a foreach start to compiled function
 * 
 * @param argument 
 */
export const forDirective = (a: string) => `for(${a}) {`;

/**
 * Adds a foreach end to compiled function
 */
export const endForDirective = () => '};';