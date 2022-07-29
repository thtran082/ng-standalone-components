import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { provideComponentStore } from "@ngrx/component-store";
import { tap } from "rxjs";
import { SharedButtonComponent, SharedUiLoadingComponent } from "../shared/ui";
import { IUserSettings } from "../shared/data-access";
import { SettingStore } from "./setting.store";

const COMMONS = [CommonModule, ReactiveFormsModule];
const COMPONENTS = [SharedUiLoadingComponent, SharedButtonComponent];

@Component({
  selector: 'th-setting',
  standalone: true,
  imports: [COMMONS, COMPONENTS],
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
            class="border border-gray-400 p-4 relative my-8 rounded-sm"
            [ngClass]="{ 'border-red-400 border-2': isNotMatchedError }"
            formGroupName="password"
          >
            <span class="absolute top-0 left-4 -translate-y-1/2 px-4 bg-white">
              Password
              <i class="text-gray-400 font-thin font-source-sans-pro ml-2"
                >* leave it if you don't want to change the password</i
              >
            </span>
            <fieldset class="mb-4">
              <input
                class="w-full py-2"
                formControlName="token"
                placeholder="Your password"
                type="password"
              />
              <span
                *ngIf="form.controls['password'].controls['token'].errors?.['minlength']"
                class="text-red-500 italic text-sm mt-4"
              >
                At least 8 characters
              </span>
            </fieldset>
            <fieldset>
              <input
                class="w-full py-2"
                formControlName="confirmToken"
                placeholder="Reenter password"
                type="password"
              />
            </fieldset>
            <span
              *ngIf="isNotMatchedError"
              class="text-red-500 italic text-sm mt-4"
            >
              The entered passwords do not match. Try again.
            </span>
          </fieldset>
        </fieldset>

        <button
          th-button
          thType="fill"
          thColor="primary"
          thShape="rounded"
          class="float-right font-semibold"
          type="button"
          loadingText="Loading"
          [thStatus]="vm.status"
          [disabled]="form.invalid"
          (click)="updateSettings()"
        >
          Update Settings
        </button>
      </form>
    </div>
  `,
  providers: [provideComponentStore(SettingStore)],
})
export class SettingComponent {
  constructor(private _fb: FormBuilder, private _settingStore: SettingStore) {}

  get isNotMatchedError() {
    return this.form.controls.password.errors?.['notMatched'];
  }

  get formValue() {
    return this.form.getRawValue();
  }

  checkPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const password = group.get('token')?.value;
    const confirmToken = group.get('confirmToken')?.value;
    if (!password || (password && password === confirmToken)) return null;
    return { notMatched: true };
  };

  readonly form = this._fb.group({
    image: [''],
    username: [''],
    bio: [''],
    email: ['', [Validators.email]],
    password: this._fb.group(
      {
        token: ['', Validators.minLength(8)],
        confirmToken: ['', Validators.minLength(8)],
      },
      {
        validators: this.checkPassword,
      }
    ),
  });
  readonly vm$ = this._settingStore.vm$.pipe(
    tap((vm) => {
      this.form.controls['email'].disable();
      if (!vm?.user) return;
      const {
        user: { image, username, bio, email },
      } = vm;
      this.form.setValue({
        image,
        username,
        bio,
        email,
        password: {
          token: '',
          confirmToken: '',
        },
      });
    })
  );

  updateSettings(): void {
    const { token, confirmToken } = this.form.value.password!;
    if (token?.trim() && token?.trim() !== confirmToken?.trim()) {
      window.alert('wrong again');
      return;
    }
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
