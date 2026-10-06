import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  imports: [
    CommonModule, 
    RouterModule, 
    MatIconModule, 
    MatToolbarModule
  ],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent  {}
