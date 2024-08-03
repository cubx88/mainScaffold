import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-impress',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './impress.component.html',
  styleUrl: './impress.component.css'
})
export class ImpressComponent {

}