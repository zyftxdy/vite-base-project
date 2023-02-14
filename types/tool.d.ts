declare type PickToRequired<T, P extends keyof T> = Partial<T> & Pick<T, P>
