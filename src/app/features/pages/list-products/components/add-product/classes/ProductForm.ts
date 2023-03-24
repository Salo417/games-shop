/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At mar-24-2023.
 */

import { FormControl } from "@angular/forms";
import { EPlatforms } from "src/app/shared/models/products/models/EPlatforms";

export interface ProductForms {
    name:        FormControl<string>;
    platform:    FormControl<string | EPlatforms>;
    price:       FormControl<number>;
    releaseDate: FormControl<Date | string>;
    quantity:    FormControl<number>;
    description: FormControl<string>;
}