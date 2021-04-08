import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  tabs: { name: string; icon: string; id: any }[] = [
    { name: 'initiatives.card', icon: 'leather', id: '' },
    { name: 'initiatives.use', icon: 'leather', id: '' },
    { name: 'initiatives.history', icon: 'leather', id: '' },
  ];

  activeTab: string = this.tabs[0].id;

  constructor() {}

  ngOnInit(): void {}
  setActigeTab(tab: string) {
    this.activeTab = tab;
  }
}
