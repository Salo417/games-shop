/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At feb-13-2023.
 */

export interface IProduct {
    pid?:          number;
    name:          string;
    platform?:     string | null;
    price:         number;
    description?:  string | null;
    quantity:      number;
    picture?:      File | null; 
    releaseDate:   Date;
}