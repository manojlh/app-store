import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../../app.models';

import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'store-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  public urlPath = 'home';

  selectedMenu: MenuItem;
  flatternMenu: MenuItem[];

  public mainMenu: MenuItem[] = [
    {
      id: 1,
      name: 'HOME',
      icon: 'home',
      route: ['home']
    },
    {
      id: 2,
      name: 'APIS',
      icon: 'extension',
      route: ['apis']
    },
    {
      id: 3,
      name: 'APPLICATIONS',
      icon: 'apps',
      route: ['legacy', 'applications']
    },
    {
      id: 4,
      name: 'FORUM',
      icon: 'forum',
      route: ['legacy', 'forum']
    },
    {
      id: 5,
      name: 'STATISTICS',
      icon: 'insert_chart',
      route: [],
      subMenu: [
        {
          id: 5.1,
          name: 'API USAGE',
          icon: 'data_usage',
          route: ['legacy', 'api-usage']
        },
        {
          id: 5.2,
          name: 'TOP USERS',
          icon: 'supervisor_account',
          route: ['legacy', 'top-users']
        },
        {
          id: 5.3,
          name: 'RESOURCE USAGE',
          icon: 'monetization_on',
          route: ['legacy', 'resource-usage']
        },
        {
          id: 5.4,
          name: 'FAULTY INVOCATIONS',
          icon: 'error_outline',
          route: ['legacy', 'faults']
        },
        {
          id: 5.5,
          name: 'MANAGE ALERT TYPES',
          icon: 'add_alert',
          route: ['legacy', 'alerts']
        }
      ]
    }

  ];

  constructor(private _router: Router) {
    this.flatternMenu = this.mainMenu
      .reduce((acc: MenuItem[], menu: MenuItem) => {
        acc = [...acc, menu, ...menu.subMenu];
        return acc;
      }, []);
  }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlParts = event.url.split('/');

        for (let i = urlParts.length - 1; i >= 0; i--) {
          const p = urlParts[i];
          const filtered = this.flatternMenu.filter((m: MenuItem) => {
            return m && m.route.indexOf(p) >= 0;
          });
          if (!!filtered && filtered.length) {
            this.selectedMenu = filtered[0];
            break;
          } else {
            this.selectedMenu = null;
          }
        }
      }
    });

    this.selectedMenu = this.mainMenu[0];
  }

}
