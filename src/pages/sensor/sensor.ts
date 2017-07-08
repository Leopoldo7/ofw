import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignalK} from '../signalk/signalk';
import {ServerFormPage} from '../serverform/serverform';

@Component({
  selector: 'page-sensor',
  templateUrl: 'sensor.html'
})
export class SensorPage {

  constructor(
  	public navCtrl: NavController,
  	public signalK: SignalK
  	){}

  	obtainServerAddrManually() {
    this.navCtrl.push(ServerFormPage);
  }

}

