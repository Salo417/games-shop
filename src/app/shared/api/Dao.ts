/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At Feb-18-2023.
 */

export interface Dao<T> {
    
    getById(id: number): T;
    
    getAll(): Iterable<(T | [any, T])>;
    
    save(t: T);
    
    update(t: T, params: string[]);
    
    delete(t: T);
}