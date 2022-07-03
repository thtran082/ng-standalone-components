import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { HomeStore } from './home.store';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  providers: [provideComponentStore(HomeStore)],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  readonly vm$ = this._homeStore.vm$;

  constructor(private _homeStore: HomeStore) {}

  ngOnInit(): void {}
}
