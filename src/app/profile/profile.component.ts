import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>
      profile works!
    </p>
  `,
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
