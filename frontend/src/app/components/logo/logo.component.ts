import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-logo',
  styleUrl: './logo.component.css',
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  maxWidth = input<number>(140);
  margin = computed(() => -(30 * this.maxWidth()) / 100);
}
