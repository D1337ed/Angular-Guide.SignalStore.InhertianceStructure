import { Component, inject } from '@angular/core';
import { CoreStore } from '../store/core.store';

@Component({
  selector: 'app-core',
  imports: [],
  templateUrl: './core.html',
  styleUrl: './core.css'
})
export class Core {

  store = inject(CoreStore);
}
