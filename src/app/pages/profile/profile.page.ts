import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // Variables
  private static readonly _NOMBRE:    string  = "Pepe";
  private static readonly _APELLIDOS: string  = "Lopez";
  protected _isModalOpen:             boolean = false;
  ProfilePage                                 = ProfilePage;    // Para poder acceder desde a la clase desde fuera

  // Getters
  static get nombre():    string  { return this._NOMBRE; }
  static get apellidos(): string  { return this._APELLIDOS; }
  get isModalOpen():      boolean { return this._isModalOpen; }

  // Setters
  set isModalOpen(isOpen: boolean) { this._isModalOpen = isOpen }

  constructor() { }

  ngOnInit() {
  }

  openEditModal() {
    this.isModalOpen = true;
  }

  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
