/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At feb-13-2023.
 */

import { IProduct } from "./IProduct";


export class Product implements IProduct {
    // FIELDS OF DATA CLASS (MODEL)
    private _pid!:          number;
    private _name!:         string;
    private _platform:      string | undefined | null;
    private _price!:        number;
    private _description:   string | undefined | null;
    private _quantity!:     number;
    private _releaseDate!:  Date;

    // GETTERS
    /**
     * The PID (Product-ID) of the product. It's a unique long number that identifies the product in databases.
     * @returns A long number of the Product ID.
     */
    public get pid(): number {
        return this._pid;
    }
    /**
     * The name of the product. It's used to identify for humans.
     * @returns The name of the product. Example: Super Mario Bros.
     */
    public get name(): string {
        return this._name;
    }
    /**
     * It's the name of the platform where the product can play. If the 
     * product is merchandising choose MERCHANDISING platform.
     * @returns A platform enum or string name that says which platform is for the product.
     */
    public get platform(): (string | undefined | null) {
        return this._platform;
    }
    /**
     * The actual price of the product.
     */
    public get price(): number {
        return this._price;
    }
    /**
     * Description of the product.
     */
    public get description(): (string | undefined | null) {
        return this._description;
    }
    /**
     * It says how many products there are in stock of the shop.
     */
    public get quantity(): number {
        return this._quantity;
    }
    /**
     * The date when this product was released.
     */
    public get releaseDate(): Date {
        return this._releaseDate;
    }

    // SETTERS
    /**
     * The PID (Product-ID) of product. It must be positive.
     * @throws If number is negative.
     */
    public set pid(pid: number) {
        /*
        if (pid >= 0)
            this._pid = pid;
        else
            throw new Error("El PID no puede ser negativo.");
        */
       this._pid = pid;
    }
    /**
     * The name of product.
     * @throws If name is empty or undefined.
     */
    public set name(name: string) {
        /*
        if (name.length > 0  ||  name != null)
            this._name = name;
        else
            throw new Error("Campo nombre es requerido.");
        */
        this._name = name;
    }
    /**
     * It's the name of the platform where the product can play. If the 
     * product is merchandising choose MERCHANDISING platform.
     * 
     * You can type the platform name yourself, but the easiest way is 
     * using the EPlatform enum to be sure it was correct.
     * 
     * Platform is optional property.
     * @throws If platform string isn't registered in EPlatfoms enum.
     */
    public set platform(platform: (string | undefined | null)) {
        /*
        let ok = false;
        for (const p in EPlatforms) {
            if (platform === p)
                ok = true;
        }

        if (ok) {
            this._platform = platform;
        } else {
            throw new Error(`La plataforma ${platform} no es válida o no se encuentra registrada como una plataforma válida.`)
        }
        */
        this._platform = platform;
    }
    /**
     * The price of product. Type it with 2 decimals length.
     * @throws If number is less than 0.0 .
     */
    public set price(price: number) {
        /*
        if (price >= 0.0)
            this._price = price;
        else
            throw new Error("Precio tiene que ser positivo o 0.0 .")
        */
        this._price = price;
    }
    /**
     * The description of product. It can be undefined.
     */
    public set description(description: (string | undefined | null)) {
        this._description = description;
    }
    /**
     * The number of products that are stored in your shop.
     * @throws If quantity is less than 0.
     */
    public set quantity(quantity: number) {
        /*
        if (quantity >= 0)
            this._quantity = quantity;
        else
            throw new Error("La cantidad debería ser positiva.");
        */
        this._quantity = quantity;
    }
    /**
     * The date when the product was released by the owner.
     */
    public set releaseDate(releaseDate: Date) {
        this._releaseDate = releaseDate;
    }


    // CONSTRUCTORS
    public constructor(pid: (number | null | undefined), name: string, price: number, quantity: number, relDate: Date, platform?: (string | null), description?: (string | null)) {
        this.pid         = (pid != null) ? pid : 0;
        this.name        = name;
        this.platform    = platform;
        this.price       = price;
        this.description = description;
        this.quantity    = quantity;
        this.releaseDate = relDate;
    }


    // FACTORY
    public static generateProduct(p: IProduct): Product {
        return new Product(
            p.pid,
            p.name,
            p.price,
            p.quantity,
            p.releaseDate,
            p.platform,
            p.description
        );
    }
}