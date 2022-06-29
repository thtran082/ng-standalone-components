import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    profile works!
  `,
})
export class ProfileComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
