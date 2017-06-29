import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-gui',
  templateUrl: 'gui.html'
})
export class GuiPage {
  testRadioOpen: boolean;
  testRadioResult;
  constructor(
    public navCtr: NavController,
    public alertCtrl: AlertController

  ){}

doRadio() {
    let alert = this.alertCtrl.create();
      alert.setTitle('Theme');

      alert.addInput({
      type: 'radio',
      label: 'Standard',
      value: 'blue',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Night Green',
      value: 'green'
    });

    alert.addInput({
      type: 'radio',
      label: 'Night Red',
      value: 'red'
    });

    alert.addButton('cancel');
    alert.addButton({
    text: 'ok',
    handler: data =>{
    console.log('Radio data:',data);
    this.testRadioOpen= false;
    this.testRadioResult = data;
    }
    });

    alert.present().then(() =>{
    this.testRadioOpen = true;
    });
  }


}
