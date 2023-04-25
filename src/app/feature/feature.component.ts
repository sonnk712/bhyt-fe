import { Component, OnInit } from '@angular/core';
import { LayoutStore } from '../core/store/layout.store';
import { AuthStore } from '../core/store/auth.store';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'agri-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  navList$ = this.layoutStore.navItems$;
  staticMenuDesktopInactive$ = this.layoutStore.isMenuDesktopInactive$;
  staticMenuMobileActive$ = this.layoutStore.isMenuMobileActive$;
  userItems: MenuItem[];
  accountInfo$ = this.authStore.accountInfo$;


  constructor(private layoutStore: LayoutStore, private authStore: AuthStore) { 
    this.userItems = [
      {label: 'Đăng xuất', command: () => this.authStore.logout()}
    ];
  }

  ngOnInit(): void {
    this.layoutStore.loadMenu();
    this.authStore.setAutoRefreshToken();
    this.authStore.loadUserIfNotExists();
  }
  doLayoutClick() {
    this.layoutStore.layoutClick();
  }

  doToggleMenuLeft() {
    this.layoutStore.toggleMenu(this.isDesktop());
  }

  doMenuClick() {
    this.layoutStore.menuClick();
  }

  isDesktop(): boolean {
    return window.innerWidth >= 768;
  }
}
