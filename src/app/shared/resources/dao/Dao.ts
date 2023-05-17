/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At Feb-18-2023.
 */

export interface Dao<T> {
    
    getById(id: number): T | Promise<T>;
    
    getAll(): Iterable<T | [any, T]> | Promise< T | Iterable<T | [any, T]> >;
    
    save(t: T);
    
    update( t: (T | number) );
    
    delete(t: (T | number));
}