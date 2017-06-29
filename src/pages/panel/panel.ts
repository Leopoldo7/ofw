import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignalK} from '../signalk/signalk';
import {ServerFormPage} from '../serverform/serverform';

@Component({
  selector: 'page-panel',
  templateUrl: 'panel.html'
})
export class PanelPage {

  constructor(
    public navCtrl: NavController,
    public signalK: SignalK
  ){}


  obtainServerAddrManually() {
    this.navCtrl.push(ServerFormPage);
  }

}

