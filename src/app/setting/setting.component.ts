import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setting.component.html',
})
export class SettingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
