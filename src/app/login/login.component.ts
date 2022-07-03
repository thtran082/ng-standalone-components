import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '../shared/ui';
import { LoginStore } from './login.store';

const COMMON_MODULES = [CommonModule, ReactiveFormsModule, RouterModule];

const COMPONENTS = [AuthLayoutComponent];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [COMMON_MODULES, COMPONENTS],
  providers: [LoginStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./login.component.html`,
  styles: [
    `
      input {
        &[required]::placeholder {
          content: '*';
        }
        &:is(.ng-touched.ng-invalid) {
          border: 1px solid red !important;

          &::placeholder {
            color: red !important;
            font-weight: lighter;
          }
        }
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  readonly form = this._fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  get email() {
    return this.form.get('email') as AbstractControl<string>;
  }

  get password() {
    return this.form.get('password') as AbstractControl<string>;
  }

  constructor(private _fb: FormBuilder, private _store: LoginStore) {}

  ngOnInit(): void {}

  onSubmit() {
    this._store.login(this.form.getRawValue());
  }
}
