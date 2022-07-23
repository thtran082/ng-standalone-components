import { AsyncPipe, KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RegisterStore } from "./register.store";
import { provideComponentStore } from "@ngrx/component-store";
import { RouterModule } from "@angular/router";

const COMMONS = [NgIf, KeyValuePipe, NgForOf, AsyncPipe, ReactiveFormsModule, RouterModule];


@Component({
  selector: "th-register",
  standalone: true,
  imports: [COMMONS],
  templateUrl: "./register.component.html",
  providers: [provideComponentStore(RegisterStore)]
})
export class RegisterComponent {
  public formGroup: FormGroup;

  readonly vm$ = this._registerStore.vm$;

  constructor(private _fb: FormBuilder, private _registerStore: RegisterStore) {
    this.formGroup = this._fb.nonNullable.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
      username: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this._registerStore.doSignup(this.formGroup.value);
    }
  }
}
