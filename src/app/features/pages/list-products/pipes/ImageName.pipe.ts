import { Pipe, PipeTransform } from "@angular/core";


@Pipe({name: 'imageName'})
export class ImageName implements PipeTransform {

    transform(file: File | null | undefined, ...args: any[]): string {
        let ret;

        if (file != null  ||  file != undefined)
            ret = file.name;
        else
            ret = '';

        return ret;
    }
}

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) at May-29-2023 following above clause:
 * 
 * BSD 3-Clause License (Read LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */