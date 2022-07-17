import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IArticle } from './../../data-access/model';
import { SharedStringUtils } from './../../utils/string.util';

export interface IArticleFormData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

@Component({
  selector: 'th-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <fieldset>
        <fieldset class="mb-4">
          <input
            autofocus
            class="w-full"
            formControlName="title"
            placeholder="Article title"
            required
            type="text"
          />
        </fieldset>
        <fieldset class="mb-4">
          <input
            class="w-full py-2"
            formControlName="description"
            placeholder="What is this article about?"
            required
            type="text"
          />
        </fieldset>
        <fieldset class="mb-4">
          <textarea
            rows="8"
            class="w-full"
            formControlName="body"
            placeholder="Write your article (markdown)"
          ></textarea>
        </fieldset>
      </fieldset>
      <fieldset class="mb-4">
        <input
          #tagInput
          class="w-full py-2"
          placeholder="press ENTER to add tags (format: camelCase)"
          type="text"
          (keydown.enter)="addTags(tagInput)"
        />
      </fieldset>
      <div class="min-h-[3rem]">
        <span
          *ngFor="let tag of form.controls.tagList.value; index as i"
          class="px-2 rounded-full bg-gray-400 text-white mr-2 mb-2 inline-block select-none"
        >
          #{{ tag }}
          <span class="ml-1 hover:cursor-pointer" (click)="deleteTag(i)">
            x
          </span>
        </span>
      </div>
      <button
        [disabled]="form.invalid"
        class="float-right primary"
        type="button"
        (click)="onSubmit()"
      >
        Publish
      </button>
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiArticleFormComponent implements OnInit {
  @Input() set article(article: IArticle) {
    this.form.setValue({
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    });
  }

  @Output() submit = new EventEmitter<IArticleFormData>();

  readonly form = this._fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    body: ['', [Validators.required]],
    tagList: [<string[]>[]],
  });

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submit.emit(this.form.getRawValue());
  }

  addTags(inputEl: HTMLInputElement) {
    const val = SharedStringUtils.toCamelCase(inputEl.value.trim());
    const isDuplicated = this.form.controls.tagList.value.some(
      (item) => item === val
    );
    if (!val || isDuplicated) return;
    this.form.controls.tagList.patchValue([
      ...this.form.controls.tagList.value,
      val,
    ]);
    inputEl.value = '';
  }

  deleteTag(index: number) {
    const newTagList = [...this.form.controls.tagList.value];
    newTagList.splice(index, 1);
    this.form.controls.tagList.patchValue(newTagList);
  }
}
