import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { KeycloakAuthorizationService } from '../../services/security/keycloak.authorization.service';
import { AuthService } from '../../services/security/auth.service';
import { firstValueFrom, interval, lastValueFrom } from 'rxjs';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems!: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  constructor(
    //private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  // End open close
  ngOnInit() {
    this.loadData();
    //this.sidebarnavItems = routes.filter(sidebarnavItem => sidebarnavItem);
    //var routes: RouteInfo[] = [];
    //const response = this.authService.obtenerMenu();
    //console.log(response)
    /*response.then(response => {
      console.log(response)
      response.forEach(resource => {
        var item: RouteInfo = {
          path: '',
          title: '',
          icon: '',
          class: '',
          extralink: false,
          submenu: []
        };
        item.path = resource.uris[0];
        item.title = resource.displayName;
        item.icon = resource.icon_uri;
        item.class = resource.attributes.class[0];
        item.extralink = resource.attributes.extralink[0];
        item.submenu = [];
        routes.push(item);
        console.log(routes);
        this.sidebarnavItems = routes.filter(sidebarnavItem => sidebarnavItem);
    })
  });*/
    /*this.authService.obtenerMenu().subscribe(response => {
      response.forEach(resource => {
        var item: RouteInfo = {
          path: '',
          title: '',
          icon: '',
          class: '',
          extralink: false,
          submenu: []
        };
        item.path = resource.uris[0];
        item.title = resource.displayName;
        item.icon = resource.icon_uri;
        item.class = resource.attributes.class[0];
        item.extralink = resource.attributes.extralink[0];
        item.submenu = [];
        routes.push(item);
        console.log(routes);
        this.sidebarnavItems = routes;
      
      //this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    })*/

    /*this.auth.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'policianacional',
        clientId: 'gestion-vehicular'
      },
      initOptions: {
        defaultResourceServerId: 'gestion-vehicular-resource'
      }
    })*/
  }

  async loadData() {
    var routes: RouteInfo[] = [];
    const categories$ = this.authService.obtenerMenu();
    var response = await lastValueFrom(categories$);
    console.log(response);
    var first: RouteInfo = {
      path: '',
      title: 'Gesti\u00F3n Vehicular',
      icon: 'mdi mdi-dots-horizontal',
      class: 'nav-small-cap',
      extralink: true,
      submenu: []
    };
    routes.push(first)
    response.forEach(resource => {
      var item: RouteInfo = {
        path: resource.uris[0],
        title: resource.displayName,
        icon: resource.icon_uri,
        class: resource.attributes.class[0] === 'none' ? '' : resource.attributes.class[0],
        extralink: resource.attributes.extralink[0] === 'true',
        submenu: []
      };
      resource.scopes?.forEach((scope: { name: string; iconUri: any; }) => {
        const data = scope.name.split(":");
        var subItem: RouteInfo = {
          path: resource.uris[0] + data[1],
          title: data[0],
          icon: scope.iconUri,
          class: '',
          extralink: false,
          submenu: []
        };
        item.submenu.push(subItem);
      });
      routes.push(item);
    })
    this.sidebarnavItems = routes.filter(sidebarnavItem => sidebarnavItem);
  }
}
