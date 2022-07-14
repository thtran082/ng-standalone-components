import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { SharedUiLoadingComponent } from '../shared/ui';
import { IUserSettings } from './../shared/data-access/model';
import { SettingStore } from './setting.store';

const ANGULAR_MODULES = [CommonModule, ReactiveFormsModule];
const COMPONENTS = [SharedUiLoadingComponent];

@Component({
  selector: 'th-setting',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <div
      class="container page lg:max-w-screen-lg mx-auto my-4 flex flex-col gap-4 font-titillium"
    >
      <span class="text-center text-4xl text-blue-500 font-bold">
        Your settings
      </span>
      <form *ngIf="vm$ | async as vm" [formGroup]="form">
        <fieldset>
          <fieldset class="mb-4">
            <input
              class="w-full py-2"
              formControlName="image"
              placeholder="Place your avatar URL"
              type="text"
              autofocus
            />
          </fieldset>
          <fieldset class="mb-4">
            <input
              class="w-full py-2"
              formControlName="username"
              placeholder="Your username"
              type="text"
            />
          </fieldset>
          <fieldset class="mb-4">
            <textarea
              rows="8"
              class="w-full"
              formControlName="bio"
              placeholder="Short description about you"
            ></textarea>
          </fieldset>
          <fieldset class="mb-4">
            <input
              class="w-full py-2"
              formControlName="email"
              placeholder="Your email"
              type="email"
            />
          </fieldset>

          <fieldset
            class="border border-gray-400 p-4 relative my-8"
            formGroupName="password"
          >
            <span class="absolute top-0 left-4 -translate-y-1/2 px-4 bg-white">
              Password
            </span>
            <fieldset class="mb-4">
              <input
                class="w-full py-2"
                formControlName="token"
                placeholder="Your password"
                type="password"
              />
            </fieldset>
            <fieldset>
              <input
                class="w-full py-2"
                formControlName="confirmToken"
                placeholder="Reenter password"
                type="password"
              />
            </fieldset>
          </fieldset>
        </fieldset>

        <button
          [disabled]="form.invalid"
          class="float-right font-titillium text-base"
          primary
          type="button"
          (click)="updateSettings()"
        >
          <ng-container *ngIf="vm.status !== 'loading'; else loadingButton">
            Update Settings
          </ng-container>
          <ng-template #loadingButton>
            Loading
            <th-loading></th-loading>
          </ng-template>
        </button>
      </form>
    </div>
  `,
  providers: [provideComponentStore(SettingStore)],
})
export class SettingComponent {
  readonly form = this._fb.group({
    image: [''],
    username: [''],
    bio: [''],
    email: ['', [Validators.email]],
    password: this._fb.group({
      token: [''],
      confirmToken: [''],
    }),
  });

  readonly vm$ = this._settingStore.vm$.pipe(
    tap((vm) => {
      this.form.controls['email'].disable();
      if (!vm?.user) return;
      const {
        user: { image, username, bio, email, token },
      } = vm;
      this.form.setValue({
        image,
        username,
        bio,
        email,
        password: {
          token,
          confirmToken: '',
        },
      });
    })
  );

  constructor(private _fb: FormBuilder, private _settingStore: SettingStore) {}

  public get formValue() {
    return this.form.getRawValue();
  }

  updateSettings(): void {
    const userSetting = <IUserSettings>{
      image: this.formValue.image,
      username: this.formValue.username,
      bio: this.formValue.bio,
      email: this.formValue.email,
      token: this.formValue.password?.token || '',
    };
    this._settingStore.updateSetting(userSetting);
  }
}
