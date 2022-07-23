import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../shared/data-access";
import { AuthLayoutComponent } from "../shared/ui";
import { FooterComponent } from "./ui/footer/footer.component";
import { HeaderComponent } from "./ui/header/header.component";

const COMPONENTS = [HeaderComponent, FooterComponent, AuthLayoutComponent];

const COMMONS = [RouterModule, AsyncPipe, NgIf, AsyncPipe];

@Component({
  selector: 'th-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [COMPONENTS, COMMONS],
})
export class LayoutComponent implements OnInit {
  readonly auth$ = this._authStore.auth$;

  constructor(private _authStore: AuthStore) {}

  ngOnInit(): void {}
}
