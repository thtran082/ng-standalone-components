import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IUserSignUp } from "../shared/data-access";
import { RegisterStore } from "./register.store";
import { provideComponentStore } from "@ngrx/component-store";

const ANGULAR_MODULES = [CommonModule, ReactiveFormsModule];
const MODULES: any = [];


@Component({
  selector: "th-register",
  standalone: true,
  imports: [ANGULAR_MODULES, MODULES],
  templateUrl: "./register.component.html",
  providers: [provideComponentStore(RegisterStore)]
})
export class RegisterComponent {
  public formGroup: FormGroup;

  constructor(private _fb: FormBuilder, private _registerStore: RegisterStore) {
    this.formGroup = this._fb.group<IUserSignUp>({
      email: '',
      password: '',
      username: '',
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this._registerStore.doSignup(this.formGroup.value);
    }
  }
}
