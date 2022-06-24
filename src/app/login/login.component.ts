import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "../shared/ui";
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginStore } from "./login.store";
import { RouterModule } from "@angular/router";

const COMMON_MODULES = [CommonModule, ReactiveFormsModule, RouterModule];

const COMPONENTS = [AuthLayoutComponent];

@Component({
  selector: "app-login",
  standalone: true,
  imports: [COMMON_MODULES, COMPONENTS],
  providers: [LoginStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-auth-layout>
      <h1 class="text-xs-center">Sign In</h1>
      <p class="text-xs-center">
        <a routerLink="/register">Need an account?</a>
      </p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <fieldset class="form-group">
          <input
            type="text"
            required
            class="form-control form-control-lg"
            placeholder="email"
            formControlName="email"/>
          <span
            *ngIf="email.invalid && (email.dirty || email.touched) && email.errors?.['required']"
            class="text-danger">
            Required
          </span>
        </fieldset>
        <fieldset class="form-group">
          <input
            type="password"
            required
            class="form-control form-control-lg"
            placeholder="password"
            formControlName="password"/>
          <span
            *ngIf="password.invalid && (password.dirty || password.touched) && password.errors?.['required']">
            Required
          </span>
        </fieldset>
        <button
          type="submit"
          class="btn btn-lg btn-primary pull-xs-right"
          [disabled]="form.invalid">
          Sign In
        </button>
      </form>

    </app-auth-layout>
  `,
  styles: [`
    input {
      &[required]::placeholder {
        content: '*'
      }
      &:is(.ng-touched.ng-invalid) {
        border: 1px solid red !important;

        &::placeholder {
          color: red !important;
          font-weight: lighter;
        }
      }
    }

  `],
})
export class LoginComponent implements OnInit {
  readonly form = this._fb.nonNullable.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", Validators.required],
  })

  get email() {
    return this.form.get("email") as AbstractControl<string>;
  }

  get password() {
    return this.form.get("password") as AbstractControl<string>;
  }

  constructor(private _fb: FormBuilder, private _store: LoginStore) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._store.login(this.form.getRawValue());
  }
}
