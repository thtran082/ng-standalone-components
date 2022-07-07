import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { HomeStore } from './home.store';
import {
  HomeUiArticleListComponent,
  HomeUiBannerComponent,
  HomeUiFeedToggleComponent,
  HomeUiTagsComponent,
} from './ui';

const ANGULAR_MODULES = [CommonModule];
const COMPONENTS = [
  HomeUiTagsComponent,
  HomeUiBannerComponent,
  HomeUiFeedToggleComponent,
  HomeUiArticleListComponent,
];

@Component({
  selector: 'th-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [ANGULAR_MODULES, COMPONENTS],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [provideComponentStore(HomeStore)],
})
export class HomeComponent implements OnInit {
  readonly vm$ = this._homeStore.vm$;

  constructor(private _homeStore: HomeStore) {}

  ngOnInit(): void {}
}
