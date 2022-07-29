import { AsyncPipe, KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { provideComponentStore } from "@ngrx/component-store";
import { SharedButtonComponent } from "../shared/ui";
import { RegisterStore } from "./register.store";

const COMMONS = [NgIf, KeyValuePipe, NgForOf, AsyncPipe, ReactiveFormsModule, RouterModule];
const COMPONENTS = [SharedButtonComponent];

@Component({
  selector: "th-register",
  standalone: true,
  imports: [COMMONS, COMPONENTS],
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
