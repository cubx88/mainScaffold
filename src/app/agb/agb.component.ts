import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-agb',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './agb.component.html',
  styleUrl: './agb.component.css'
})
export class AgbComponent {

}
