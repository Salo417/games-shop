/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At Mar-24-2023.
 */

import { FormControl } from "@angular/forms";
import { EPlatforms } from "src/app/shared/resources/product/EPlatforms";

export interface ProductForms {
    name:        FormControl<string | null>;
    platform:    FormControl<string | EPlatforms | null>;
    price:       FormControl<number | null>;
    releaseDate: FormControl<Date | string | null>;
    quantity:    FormControl<number | null>;
    picture:     FormControl<File | null | undefined>;
    description: FormControl<string | null>;
}

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) at Mar-24-2023 following above clause:
 * 
 * BSD 3-Clause License (Read LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */