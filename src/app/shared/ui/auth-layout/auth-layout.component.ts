import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, } from "@angular/core";

@Component({
  selector: "th-auth-layout",
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-14">
      <ng-content></ng-content>
    </div>
  `,
})
export class AuthLayoutComponent {
}
