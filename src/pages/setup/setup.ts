import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeneralPage } from '../general/general';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class SetupPage {
  constructor(
  public navCtrl: NavController
  ) {}

goToSetting(whoIs:string): void{

      switch(whoIs) {
        case 'General': {
            this.navCtr.push(GeneralPage);
            break;
        }

        default : {
          break; 
        }

       }
      }







}
