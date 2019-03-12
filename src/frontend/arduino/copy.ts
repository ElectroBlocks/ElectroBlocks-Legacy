
/**
 * For Components that attach to the arduino that copies are needed to be made
 */
export interface Copy<T> {
    
    /**
     * Makes new copy of itself
     */
    makeCopy(): T;
}