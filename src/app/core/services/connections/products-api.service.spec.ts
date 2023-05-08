import { TestBed } from '@angular/core/testing';

import { ProductsApiService } from './products-api.service';

describe('ProductsApiService', () => {
  let service: ProductsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) on Apr-13-2023.
 * This source code is governed by:
 * 
 * BSD 3-Clause License (That can be found in LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */