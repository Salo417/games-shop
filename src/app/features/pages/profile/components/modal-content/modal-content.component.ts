import { Component, OnInit } from '@angular/core';
import { ContentOptions } from './content-options';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  private _isOpen: boolean = false;

  // Getters
  get isOpen():      boolean { return this._isOpen; }

  // Setters
  set isOpen(isOpen: boolean) { this._isOpen = isOpen; }

  constructor() { }

  ngOnInit() {}

  setModalOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }

}
