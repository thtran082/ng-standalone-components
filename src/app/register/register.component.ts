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
  providers: [provideComponentStore(RegisterStore)],
  template: `
    <div *ngIf="vm$ | async as vm" class="max-w-screen-sm mx-auto">
      <div class="mx-auto flex flex-col gap-2 space-between items-center">
        <span class="text-center text-4xl text-blue-500 font-bold">Sign Up</span>
        <span class="text-center text-base text-gray-400">
      <a class="text-blue-500 italic" routerLink="/login">Have an account?</a>
    </span>
        <form (ngSubmit)="onSubmit()" [formGroup]="formGroup" autocomplete="off" class="w-full flex flex-col gap-4">
          <fieldset class="w-full flex flex-col gap-2">
            <input autocomplete="new-email"
                   autofocus
                   class="w-full"
                   formControlName="email"
                   placeholder="email"
                   required
                   type="text"/>
          </fieldset>
          <fieldset class="w-full flex flex-col gap-2">
            <input autocomplete="new-password" class="w-full" formControlName="password" placeholder="password" required
                   type="password"/>
          </fieldset>
          <fieldset>
            <input autocomplete="new-username" class="w-full" formControlName="username" placeholder="username" required
                   type="text"/>
          </fieldset>
          <div class="flex justify-between">
            <div class="self-start">
              <ng-container *ngFor="let error of vm.errors | keyvalue">
                <div *ngFor="let item of error.value" class="text-red-600">
                  <span>{{error.key}} {{item}}</span>
                </div>
              </ng-container>
            </div>
            <button th-button
                    thShape="rounded"
                    thType="fill"
                    thColor="primary"
                    [disabled]="formGroup.invalid"
                    class="self-end"
                    type="submit">Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
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
