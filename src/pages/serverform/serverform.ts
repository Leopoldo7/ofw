import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {AlertController, NavController, LoadingController, NavParams, App, Events} from 'ionic-angular';
import {SignalK} from '../signalk/signalk';

@Component({
  templateUrl: './serverform.html'
})
export class ServerFormPage {
  authForm: FormGroup;
  serverAddress: AbstractControl;
  serverPath: AbstractControl;
 
  constructor(
    fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public events: Events,
    public signalk:SignalK
  ) {
    let signalKServer = window.localStorage.getItem('signalkServer') || '';
    let signalKServerPath = window.localStorage.getItem('signalkServerPath') ||
                            '/signalk/v1/stream';
    this.authForm = fb.group({
      'serverAddress': [signalKServer,
                        Validators.compose([Validators.required])],
      'serverPath': [signalKServerPath,
                        Validators.compose([Validators.required])]
    });
    this.serverAddress = this.authForm.controls['serverAddress'];
    this.serverPath = this.authForm.controls['serverPath'];
  }

  onSubmit(value: any) { 
    if(this.authForm.valid) {
      let loading = this.loadingCtrl.create({
        duration: 1000
      });
      //loading.present().then( () => {
        this.events.publish('signalk:connect',
                            value.serverAddress,
                            value.serverPath);
        this.navCtrl.pop(); 
      //});
    }
  }

  disconnettiWS(){
    this.signalk.closeConnection();
    this.navCtrl.pop();
  }
}
