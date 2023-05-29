export interface TmpProduct {
    name:        string,
    platform:    string,
    price:       string,
    description: string,
    quantity:    number,
    picture:     File | null,
    releaseDate: Date | null
}