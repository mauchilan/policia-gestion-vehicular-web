import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  //NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/security/auth.service';
import { PersonalService } from '../../services/app/personal.service';
import { WebsocketService } from '../../services/app/websocket.service';
//import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  //public config: PerfectScrollbarConfigInterface = {};

  //private webSocket: WebSocket;
  listaSolicitudes: any[] = [];
  public showSearch = false;
  user: any = {};

  constructor(private modalService: NgbModal, private authService: AuthService,
    private personalService: PersonalService) {}
  
  ngOnInit(): void {
    //this.websocketService.openWebsocketConnection();
    //this.websocketService.getMessage('notifications').subscribe(msg => console.log(msg));
    const data = this.authService.getUserStorage();
    this.personalService.obtenerUsuario(data.id).subscribe(response => {
      this.user = response;
    });
  }

  send() {
    console.log('nose')
    //this.webSocket.onopen = () => this.webSocket.send("Message");
    //this.websocketService.sendWebSocket('data');
  }

  // This is for Notifications
  public notifications: any[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: any[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    //this.websocketService.closeWebsocketConnection();
  }
}
