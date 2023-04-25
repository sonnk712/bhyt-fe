import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { NavItem } from '../../shared/model/nav-item';
import { RA_MANAGE_PATH } from '../model/certificate';

interface LayoutState {
  navItems: NavItem[];
  staticMenuDesktopInactive: boolean;
  staticMenuMobileActive: boolean;
  menuClick: boolean;
}

@Injectable({ providedIn: 'root' })
export class LayoutStore extends ComponentStore<LayoutState> {

  constructor() {
    super({
      navItems: [] as NavItem[],
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
      menuClick: false
    })
  }

  readonly isMenuDesktopInactive$ = this.select((state) => state.staticMenuDesktopInactive);
  readonly isMenuMobileActive$ = this.select((state) => state.staticMenuMobileActive);
  readonly navItems$ = this.select(({ navItems }) => navItems);

  readonly loadMenu = this.updater((state) => ({
    ...state,
    navItems: [
      { id: '2', label: 'Quản lý thông tin', icon: 'pi pi-fw pi-file', routerLink: '/statistic/', isHasChildren: true, items: [
          {id: '3', label: 'Báo cáo thống kê', icon: 'pi pi-fw pi-bell', routerLink: `/statistic/payment-status`},
          {id: '4', label: 'Doanh thu', icon: 'pi pi-fw pi-check-circle', routerLink: `/statistic/revenue-list`},
          
        ] },
      { id: '6', label: 'Quản lý cấu hình', icon: 'pi pi-fw pi-map', routerLink: '/config/', isHasChildren:true, items: [
        {id: '5', label: 'Quản lý đại lý', icon: 'pi pi-fw pi-check-circle', routerLink: `/statistic/agency-management`},
        {id: '7', label: 'Đơn vị tiền', icon: 'pi pi-fw pi-list', routerLink: '/config/cost-unit'},
        {id: '8', label: 'Thời hạn', icon: 'pi pi-fw pi-book', routerLink: '/config/period'}
      ]},
    ]
  }));

  readonly layoutClick = this.updater((state) => ({
    ...state,
    menuClick: false,
    staticMenuMobileActive: (!state.menuClick && state.staticMenuMobileActive) ? false : state.staticMenuMobileActive
  }));

  readonly toggleMenu = this.updater((state, isDesktop: boolean) => ({
    ...state,
    menuClick: true,
    staticMenuDesktopInactive: isDesktop ? !state.staticMenuDesktopInactive : state.staticMenuDesktopInactive,
    staticMenuMobileActive: isDesktop ? state.staticMenuMobileActive : !state.staticMenuMobileActive
  }));

  readonly menuClick = this.updater((state) => ({
    ...state,
    menuClick: true
  }));
}
