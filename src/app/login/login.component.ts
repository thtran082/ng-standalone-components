import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthLayoutComponent, SharedUiLoadingComponent } from "../shared/ui";
import { LoginStore } from "./login.store";

const COMMON_MODULES = [CommonModule, ReactiveFormsModule, RouterModule];

const COMPONENTS = [AuthLayoutComponent,SharedUiLoadingComponent];

@Component({
  selector: 'th-login',
  standalone: true,
  imports: [COMMON_MODULES, COMPONENTS],
  providers: [LoginStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./login.component.html`,
})
export class LoginComponent implements OnInit {
  readonly form = this._fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
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
