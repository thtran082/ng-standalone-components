import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

const COMMONS = [RouterModule];

@Component({
  selector: 'th-articles-toggle',
  standalone: true,
  imports: [COMMONS],
  template: `
    <div class="mt-2 -mb-[1px]">
      <ul class="after:content-[''] table clear-both">
        <li class="float-left capitalize text-slate-400">
          <a
            class="block px-4 py-2 border-b-2 border-b-transparent"
            [routerLink]="['/profile', username]"
            [routerLinkActive]="['active', 'border-b-blue-400']"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            My Articles
          </a>
        </li>
        <li class="float-left capitalize text-slate-400">
          <a
            class="block px-4 py-2 border-b-2 border-b-transparent"
            [routerLink]="['/profile', username, 'favorites']"
            [routerLinkActive]="['active', 'border-b-blue-400']"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            My Favorited Articles
        </a>
        </li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileUiArticlesToggleComponent {
  @Input() username?: string;

  constructor() { }

}
