import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { SpinnerComponent } from './shared/spinner.component';
import { FullComponent } from './layouts/full/full.component';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { initializeKeycloak } from './services/security/keycloak-init';
import { AuthService } from './services/security/auth.service';
import { InterceptorService } from './services/security/interceptor.service';
import { BlankComponent } from './layouts/blank/blank.component';
import { CommonModule } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

//const config: SocketIoConfig = { url: 'ws://localhost:8280', options: { transports: ['websocket'], path: '/gestion-api/ws/notifications'} };
const config: SocketIoConfig = {
  url: 'ws://localhost:8280', options: {
    transports: ['websocket'],
    autoConnect: false,
    //withCredentials: true,
    //auth: { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ5OGk4cFBibVFyS0VyTlJrZEQxTUJaT0R2eWRvSFlUbklRQWljLTZqREtZIn0.eyJleHAiOjE3MDYzOTA5MTYsImlhdCI6MTcwNjM5MDYxNiwianRpIjoiZWM1NzdkZmUtZjNhNi00Y2Y0LWI5ZWEtNGRiOTNiZmE1NmE4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9wb2xpY2lhbmFjaW9uYWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzAxYWU1OTQtZDZhZS00YWQxLWE3Y2QtY2FlZDk3MTI1OTg0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZ2VzdGlvbi12ZWhpY3VsYXIiLCJzZXNzaW9uX3N0YXRlIjoiMzQ1N2I3YjQtNTYzMi00NDg4LTgwYTgtNDM0MWIxMDgyOWU3IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtcG9saWNpYSBuYWNpb25hbCIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMzQ1N2I3YjQtNTYzMi00NDg4LTgwYTgtNDM0MWIxMDgyOWU3IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJNYXVyaWNpbyBOaWNvbGFzIENoaWxhbiBNYWNpYXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXVyaWNpby5jaGlsYW4iLCJnaXZlbl9uYW1lIjoiTWF1cmljaW8gTmljb2xhcyIsImZhbWlseV9uYW1lIjoiQ2hpbGFuIE1hY2lhcyIsImVtYWlsIjoibW5jaGlsYW5AdXRwbC5lZHUuZWMifQ.l5QZ-f0AwHIt4jUjekvDb2VlgRYPsYslaTNM3l-1gD8aEOXJfi8KX7ZgKpOpS2epSbrJjrfkZfp1Y9li0JDzbyWf5bEecQPhg2RIO-WviMuH6jeAPNzstNq_d8rZ3rJLFFCr6drKxqjnDlEPteuWFSpL38uHSPU4ygt6wjaboZLn0RbgbO2h0BR8dVtORecfH_fZGrV__fvpUzxjjLSjePXMG8xbmwPwH-bEWXplTRLnwXpoAu2imYMR7i3vY5nf85vq3aT65mpDagh_fhfsgXeDtVJ3ckl1IFU4iW4HjC2Q5Ds3_9IYle_FUE1_BfW0d9i2iVG2S7B2SUkS-CNbIg` },
    //extraHeaders: {
      //Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ5OGk4cFBibVFyS0VyTlJrZEQxTUJaT0R2eWRvSFlUbklRQWljLTZqREtZIn0.eyJleHAiOjE3MDY0MTc0NDcsImlhdCI6MTcwNjQxNzE0NywianRpIjoiMjFkMTdkYWEtY2JiOS00MmI1LTgwNWMtMzc1ODRiNGI0NmFlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9wb2xpY2lhbmFjaW9uYWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzAxYWU1OTQtZDZhZS00YWQxLWE3Y2QtY2FlZDk3MTI1OTg0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZ2VzdGlvbi12ZWhpY3VsYXIiLCJzZXNzaW9uX3N0YXRlIjoiNDY5NDBhYTMtYWZhZS00MmRjLWI3YTAtZmVhZTljMzk0MjdlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtcG9saWNpYSBuYWNpb25hbCIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNDY5NDBhYTMtYWZhZS00MmRjLWI3YTAtZmVhZTljMzk0MjdlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJNYXVyaWNpbyBOaWNvbGFzIENoaWxhbiBNYWNpYXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXVyaWNpby5jaGlsYW4iLCJnaXZlbl9uYW1lIjoiTWF1cmljaW8gTmljb2xhcyIsImZhbWlseV9uYW1lIjoiQ2hpbGFuIE1hY2lhcyIsImVtYWlsIjoibW5jaGlsYW5AdXRwbC5lZHUuZWMifQ.eqosMMo2g-CyvPWZUxjSB6WHrhrd1NhlvaQG-H7adxy_sDADyVyxa5J6VMiWCSG81xx1BIqwNgeugoovhH5P5sWbc0Wq3ROouy7Q7MfjrBKm1LgMCRo5aqYVEk2luRub7RaMaLRyw910hGko2D8BodA2oMd6K7-x8dt-18P93OcWZsk4ZJzgrYGvuCZnNbMEqL4z8EfYZVhSh-K10LEAg1ydKo8VN6a3HiJGjsm6zY1y77L4o--c1mJZSBEXAxkBOEL9Yk9ai5tBuTshh_DZu4fUFNVSqccAcNnhWHci3mAXPDXOeizU9nprrSMQK_N2FQh7GITFimko6rb_g6nEHQ`,
      //cabecera: 'no lo se'
    //},
    /*transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ5OGk4cFBibVFyS0VyTlJrZEQxTUJaT0R2eWRvSFlUbklRQWljLTZqREtZIn0.eyJleHAiOjE3MDY0MTQ3MzcsImlhdCI6MTcwNjQxNDQzNywianRpIjoiZjc4M2VlNjYtZDM0Yi00MzRhLWFlNTktNjg0NmM4NDk5Njg0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9wb2xpY2lhbmFjaW9uYWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzAxYWU1OTQtZDZhZS00YWQxLWE3Y2QtY2FlZDk3MTI1OTg0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZ2VzdGlvbi12ZWhpY3VsYXIiLCJzZXNzaW9uX3N0YXRlIjoiZDRhMTRhMjItYTM0My00ZmMzLThjYjktZjUxYTJmMGI4ZjIzIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtcG9saWNpYSBuYWNpb25hbCIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiZDRhMTRhMjItYTM0My00ZmMzLThjYjktZjUxYTJmMGI4ZjIzIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJNYXVyaWNpbyBOaWNvbGFzIENoaWxhbiBNYWNpYXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXVyaWNpby5jaGlsYW4iLCJnaXZlbl9uYW1lIjoiTWF1cmljaW8gTmljb2xhcyIsImZhbWlseV9uYW1lIjoiQ2hpbGFuIE1hY2lhcyIsImVtYWlsIjoibW5jaGlsYW5AdXRwbC5lZHUuZWMifQ.qCz2s93G6G4b4xYhiMcuSxVj0SsKHTVtMELjJCinmdckr4aIuNWV8wnNH_5lMpzHQ6VxNKfy_DVJjCyIqdN3fcjLTZIJBhHmR2tHZRA5LG2O1qUfxQ5D1lfLuwNE7V4Gyqq5g5NDbioFF7dwlUYOqhL5mGibOLb1AtGGOFGF4zzLrebd3gIyvIKCdM_PU2D4aM5UephHSKCbkBNIHUIzNs6P4A2fRudGyJixNTbYBLWESbNMvlKWhY9gl5-p3YXtoL8T5KmkRauVZQvgSHWfg4chE7fEkngBKp8KPX4136QR7rDO-HoL81oh2QGNfIv3J8rozmeRJtMCDIDxAlcI9A",
          //"Sec-WebSocket-Version": "13",
          //"Sec-WebSocket-Key": "/LoAT5AMzS8rjLbnTITlcg==",
          //"Connection": "Upgrade",
          //"Upgrade": "websocket",
          //"Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits"
        }
      }
    },*/
    path: '/gestion-api/ws/notifications',
    //auth: { Authorization: 'sssssss'}
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, AuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
      //deps: [AuthService],
    },
    KeycloakService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
