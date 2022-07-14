import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { IArticleFormData, SharedUiArticleFormComponent } from '../shared/ui/article-form/article-form.component';
import { NewArticleStore } from './new-article.store';

@Component({
  selector: 'th-new-article',
  standalone: true,
  imports: [CommonModule, SharedUiArticleFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container page lg:max-w-screen-lg mx-auto my-4 flex flex-col gap-4">
      <th-article-form (submit)="onSubmit($event)"></th-article-form>
    </div>
  `,
  providers: [provideComponentStore(NewArticleStore)]
})
export class NewArticleComponent implements OnInit {

  constructor(private _newArticleStore: NewArticleStore) { }

  ngOnInit(): void {
  }

  onSubmit(formValue: IArticleFormData) {
    debugger;
    this._newArticleStore.createArticle(formValue);
  }

}
