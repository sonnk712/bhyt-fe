import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NavItem} from '../../model/nav-item';

@Component({
  selector: 'agri-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {

  @Input() items: NavItem[] = [];

}
