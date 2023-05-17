/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At Mar-24-2023.
 */

import { FormControl } from "@angular/forms";
import { EPlatforms } from "src/app/shared/resources/product/EPlatforms";

export interface ProductForms {
    name:        FormControl<string>;
    platform:    FormControl<string | EPlatforms>;
    price:       FormControl<number>;
    releaseDate: FormControl<Date | string | undefined>;
    quantity:    FormControl<number>;
    description: FormControl<string | undefined>;
}

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) on May-04-2023.
 * This source code is governed by:
 * 
 * BSD 3-Clause License (That can be found in LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */