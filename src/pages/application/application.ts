import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-application',
  templateUrl: 'application.html'
})
export class ApplicationPage {
  testCheckboxOpen: boolean;
  testCheckboxResult;

constructor(
    public navCtr: NavController,
    public alertCtrl: AlertController
  ){}

  doCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Marine Apps');

    alert.addInput({
      type: 'checkbox',
      label: 'Archivio',
      value: 'value1',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Calcolatrice',
      value: 'value2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Calendario',
      value: 'value3',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'ChatOn',
      value: 'value4'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Chrome',
      value: 'value5',
   
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Download',
      value: 'value6'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Drive',
      value: 'value7',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Dropbox',
      value: 'value8'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'E-mail',
      value: 'value9',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Flipboard',
      value: 'value10'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Foto',
      value: 'value11',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Fotocamera',
      value: 'value12'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Fusi orari',
      value: 'value13',
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }


doRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Home Apps');

    alert.addInput({
      type: 'checkbox',
      label: 'Archivio',
      value: 'value14',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Calcolatrice',
      value: 'value15'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Calendario',
      value: 'value16',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'ChatOn',
      value: 'value17'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Chrome',
      value: 'value18',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Download',
      value: 'value19'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Drive',
      value: 'value20',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Dropbox',
      value: 'value21'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'E-mail',
      value: 'value22',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Flipboard',
      value: 'value23'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Foto',
      value: 'value24',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Fotocamera',
      value: 'value25'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Fusi orari',
      value: 'value26',
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }




}


  
