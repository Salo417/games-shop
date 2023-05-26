/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At feb-13-2023.
 */

import { ErrUserPidNotDefined } from "src/app/shared/errors/ErrUserPidNotDefined";
import { IProduct } from "../../../resources/product/IProduct";
import { Product } from "../models/Product";

export class ProductController {
    // PROPERTIES
    private _model: Product;
    //private _view:  ProductView;
    
        
    // MODEL GETTERS
    /**
     * The PID (Product-ID) of the product. It's a unique long number that identify the product in databases.
     * @returns A long number of the Product ID.
     */
    public get pid(): number {
        return this._model.pid;
    }
    /**
     * The name of the product. It's used for identify from humans.
     * @returns The name of the product. Example: Super Mario Bros.
     */
    public get name(): string {
        return this._model.name;
    }
    /**
     * It's the name of the platform where the product can play. If the 
     * product is a merchandising choose MERCHANDISING platform.
     * 
     * You can type the platform name yourself. but the most easily way is 
     * using the Platform enum for no
     * @returns A platform enum or string name that say which platform is for the product.
     */
    public get platform(): (string | undefined | null) {
        return this._model.platform;
    }
    /**
     * The actual price of the product.
     */
    public get price(): number {
        return this._model.price;
    }
    /**
     * Description of the product.
     */
    public get description(): string | undefined | null {
        return this._model.description;
    }
    /**
     * Get how many products there are in stock of the shop.
     */
    public get quantity(): number {
        return this._model.quantity;
    }
    /**
     * The date when this product was released.
     */
    public get releaseDate(): Date {
        return this._model.releaseDate;
    }


    // MODELS SETTERS
    public set pid(pid: number) {
        this._model.pid = pid;
    }
    public set name(name: string) {
        this._model.name = name;
    }
    public set platform(platform: string | undefined | null) {
        this._model.platform = platform;
    }
    public set price(price: number) {
        this._model.price = price;
    }
    private set description(description: string | undefined | null) {
        this._model.description = description;
    }
    public set quantity(quantity: number) {
        this._model.quantity = quantity;
    }
    public set releaseDate(releaseDate: Date) {
        this._model.releaseDate = releaseDate;
    }

    // GETTERS
    public get product(): Product {
        return this._model;
    }
    //SETTERS
    /**
     * Change the current value of the product. Notice that it doesn't replace the old product only replaces the fields.
     * @throws ErrUserPidNotDefined If you add an product without PID.
     */
    public set product(value: IProduct) {
        if (typeof(value.pid) == 'number') {
            this._model.pid         = value.pid;
            this._model.name        = value.name;
            this._model.platform    = value.platform;
            this._model.price       = value.price;
            this._model.description = value.description;
            this._model.quantity    = value.quantity;
            this._model.releaseDate = value.releaseDate;
        } else {
            throw new ErrUserPidNotDefined();
        }
        //this._model = value;
    }


    // CONSTRUCTORS
    /**
     * 
     * @param initProduct A IProduct
     * @throws ErrUserPidNotDefined If you add an product without PID.
     */
    public constructor(initProduct: IProduct) {
        if (typeof(initProduct.pid) == 'number') {
            this._model = new Product(
                initProduct.pid,
                initProduct.name,
                initProduct.price,
                initProduct.quantity,
                initProduct.releaseDate,
                initProduct.platform,
                initProduct.description
            );
        } else {
            throw new ErrUserPidNotDefined();
        }
    }

    // METHODS
    //public deleteProduct()
}