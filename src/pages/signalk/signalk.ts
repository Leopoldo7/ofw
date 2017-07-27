import {Injectable} from '@angular/core';
import {LoadingController, AlertController, Events} from 'ionic-angular';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {ServerFormPage} from '../serverform/serverform';

@Injectable()
export class SignalK {
  connected: boolean = false;
  selfId: string;
  private ws: any = null;
  private timeout: any;
  private count = 0;
  private MAX_TENTATIVI = 5;

  constructor(
    public events: Events,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ){
    this.events.subscribe('signalk:connect', (ipAddress,path) => {
      this.setServerAddress(ipAddress, path);
    });
  }

  setServerAddress(address: string, path, callback: Function = null) {
    /*
    Sets a new server address (e.g. 192.168.1.2:3000)
    */
    if (this.ws != null) {
      this.ws.close(true);
      this.ws = null;
    }
    window.localStorage.setItem('signalkServer', address);
    window.localStorage.setItem('signalkServerPath', path);
    let wsServerPath = 'ws://' + address + path +
                       '?stream=delta&context=self';  //?subscribe=all';
    this.startWebsocketConnection(wsServerPath);
  }

  startWebsocketConnection(wsServerPath) {
    /* 
    We will try to connect to WebSocket server every 30
    seconds, if the connection does not succeed.
 
    If connection is established, this timeout will be
    canceled.
    */
    this.timeout = setTimeout( () => {
      this.count++;
      if(this.count == this.MAX_TENTATIVI){
        clearTimeout(this.timeout);
        this.timeout = null;
      } else {
        this.startWebsocketConnection(wsServerPath);
      }
    }, 30000);

    if (this.ws == null) {
      this.ws = new $WebSocket(wsServerPath);

      this.ws.onOpen( () => {
        this.connected = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.events.publish('ws:open', 1);
      });

      this.ws.onClose( () => {
        
        if(this.ws != null){
          this.connected = false;
          this.ws.close(true);
        }
        // Upon close of connection, try to reconnect in 10 seconds
        //setTimeout( () => this.startWebsocketConnection(wsServerPath), 10000);
        this.events.publish('ws:close', 1);
      });

      this.ws.onError( () => {
        this.connected = false;
        this.ws.close(true);
        // Upon close of connection, try to reconnect in 10 seconds
        //setTimeout( () => this.startWebsocketConnection(wsServerPath), 10000);
        this.events.publish('ws:error', 1);
      });

      this.ws.onMessage( (message) => {
        this.events.publish('ws:message', message.data, this.connected);
      }, {filter: '*', autoApply: false});
    }
    //this.ws.connect();
  }

  closeConnection(){
    if (this.ws != null) {
      this.ws.close();
      this.ws = null;
      
      this.connected = false;
    }
  }


}