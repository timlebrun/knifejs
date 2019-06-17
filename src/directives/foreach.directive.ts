/**
 * Adds a foreach start to compiled function
 * 
 * @param argument 
 */
export const foreachDirective = (a: string) => {
    if (!a || !a.includes('as')) throw Error('Fuck');
    const [iterable, item] = a.split(' as ');
    return `${iterable}.forEach((${item}, index) => {`;   
};

/**
 * Adds a foreach end to compiled function
 */
export const endForeachDirective = () => '});';