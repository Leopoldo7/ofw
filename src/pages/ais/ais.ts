import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignalK} from '../signalk/signalk';
import {ServerFormPage} from '../serverform/serverform';

@Component({
  selector: 'page-ais',
  templateUrl: 'ais.html'
})
export class AisPage {

  constructor(
  public navCtrl: NavController,
  public signalK: SignalK
  ){}

  obtainServerAddrManually() {
    this.navCtrl.push(ServerFormPage);
  }

}

