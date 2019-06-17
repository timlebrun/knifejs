/**
 * Adds an if() statement to compiled function
 * 
 * @param a Argument given in template
 */
export const ifDirective = (a: string) => `if (${a}) {`;

/**
 * Adds an elseif() directive to compiled function
 * 
 * @param a Argument given in template
 */
export const elseIfDirective = (a: string) => `} else if(${a}) {`;

/**
 * Adds an else statement in compiled function
 */
export const elseDirective = () => `} else {`;

/**
 * Adds an end bracket to compiled function
 */
export const endIfDirective = () => `}`;