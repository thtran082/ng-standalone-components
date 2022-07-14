import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ArticleStore } from "./article.store";
import { provideComponentStore } from "@ngrx/component-store";

const ANGULAR_MODULES = [CommonModule]

@Component({
  selector: 'th-article',
  standalone: true,
  imports: [ANGULAR_MODULES],
  template: `
    <div class="container page lg:max-w-screen-lg mx-auto my-4">
      hello
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ArticleStore)]
})
export class ArticleComponent {
  readonly vm$ = this._articleStore.vm$;

  constructor(private _articleStore: ArticleStore) { }
}
