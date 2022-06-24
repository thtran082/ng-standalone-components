import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      setting works!
    </p>
  `,
  styles: [
  ]
})
export class SettingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
