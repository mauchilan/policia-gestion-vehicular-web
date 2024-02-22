import { Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  /*websocket!: WebSocket;

  constructor(private authService: AuthService) { }

  openWebsocketConnection() {
    const url = "ws://localhost:8280/gestion-api/ws/notifications?authorization=Bearer " + this.authService.getToken()
    this.websocket = new WebSocket(url);

    this.websocket.onopen = (e) => {
      console.log(e);
    }

    this.websocket.onmessage = (e) => {
      console.log(e);
    }

    this.websocket.onclose = (e) => {
      console.log(e);
    }
  }

  sendWebSocket(data: any) {
    this.websocket.send(JSON.stringify(data))
  }

  closeWebsocketConnection() {
    this.websocket.close();
  }*/

  constructor(private socket: Socket, private authService: AuthService) {
    console.log(this.socket)
    const token = this.authService.getToken();
    this.socket.ioSocket.io.opts.query = { token: token }
    //const config: SocketIoConfig = { url: 'ws://localhost:8580/gestion-api/ws', options: {} };
    //this.socket.ioSocket.config = config;
    //this.socket.ioSocket.transportOptions
    //this.socket.ioSocket.secure = true;
    //this.socket.ioSocket.withCredentials = true;
    //this.socket.ioSocket['auth'] = { token: token };
    //this.socket.ioSocket['auth'] = { Authorization: `Bearer ${token}` };
    //this.socket.ioSocket.extraHeaders = { Authorization: `Bearer ${token}` };
    //this.socket.ioSocket.io.opts.extraHeaders = { Authorization: `Bearer ${token}` };
    this.socket.connect();
    console.log(this.socket)
  }

  public getMessage(eventName: any) {
    return new Observable(observer => {
      this.socket.on(eventName, (message: unknown) => {
        observer.next(message);
      });
    });
  }

}
