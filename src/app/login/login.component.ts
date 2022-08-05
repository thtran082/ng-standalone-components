import { AsyncPipe, KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthLayoutComponent, SharedButtonComponent, SharedUiLoadingComponent } from "../shared/ui";
import { LoginStore } from "./login.store";

const COMMONS = [NgIf, AsyncPipe, ReactiveFormsModule, RouterModule, NgForOf, KeyValuePipe];

const COMPONENTS = [AuthLayoutComponent,SharedUiLoadingComponent, SharedButtonComponent];

@Component({
  selector: 'th-login',
  standalone: true,
  imports: [COMMONS, COMPONENTS],
  providers: [LoginStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <th-auth-layout>
      <ng-container *ngIf="vm$ | async as vm">
        <form (ngSubmit)="onSubmit()" [formGroup]="form" autocomplete="off"
              class="flex flex-col gap-4 justify-center items-center mx-auto max-w-screen-sm">
          <span class="text-center text-4xl text-blue-500 font-bold">Sign In</span>
          <span class="text-center text-base text-gray-400">
        <a routerLink="/register">Need an account?</a>
      </span>
          <fieldset class="w-full flex flex-col gap-2">
            <input autofocus autocomplete="new-email" autofocus class="w-full" formControlName="email" placeholder="email" required
                   type="text"/>
            <span *ngIf="email.invalid && (email.dirty || email.touched) && email.errors?.['required']" class="text-red-400">
          Required
        </span>
          </fieldset>
          <fieldset class="w-full flex flex-col gap-2">
            <input autofocus autocomplete="new-password" class="w-full" formControlName="password" placeholder="password" required
                   type="password"/>
            <span *ngIf="password.invalid && (password.dirty || password.touched) && password.errors?.['required']"
                  class="text-red-400">
          Required
        </span>
          </fieldset>
          <div class="flex justify-between w-full">
            <div class="text-red-500 self-start flex flex-row gap-2">
              <ng-container *ngFor="let error of vm.errors | keyvalue">
                <ng-container *ngFor="let msg of error.value">
                  <span>{{error.key}} {{msg}}</span>
                </ng-container>
              </ng-container>
            </div>
            <button [disabled]="form.invalid" [thShape]="'rounded'" [thStatus]="vm.status" th-button thType="outlined" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </ng-container>
    </th-auth-layout>

  `,
})
export class LoginComponent implements OnInit {
  readonly form = this._fb.nonNullable.group({
    email: ['huy_test_account@gmail.com', [Validators.email, Validators.required]],
    password: ['123456', Validators.required],
  });

  readonly vm$ = this._store.vm$;

  constructor(private _fb: FormBuilder, private _store: LoginStore) {}

  get email() {
    return this.form.get('email') as AbstractControl<string>;
  }

  get password() {
    return this.form.get('password') as AbstractControl<string>;
  }

  ngOnInit(): void {}

  onSubmit() {
    this._store.login(this.form.getRawValue());
  }
}
