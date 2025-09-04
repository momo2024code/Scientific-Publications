import { Component } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  standalone: false,
  templateUrl: './main-navbar.html',
  styleUrl: './main-navbar.css'
})
export class MainNavbar {
  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
  closeMenu() {
    this.menuActive = false;
  }
}
