import { Component, Input } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { GeneralPage } from '../general/general';
import { ServicesPage } from '../services/services';
import {MetaPage} from '../meta/meta';
import {GuiPage} from '../gui/gui';
import {MapsPage} from '../maps/maps';
import {ApplicationPage} from '../application/application';
import {ToolsPage} from '../tools/tools';
import {MasterPage} from '../master/master';
import {ServerFormPage} from '../serverform/serverform';
import { OnInit } from '@angular/core';
import { SignalK } from '../signalk/signalk';
import { MapSettingsPage } from '../mapsettings/mapsettings';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class SetupPage {
  constructor(
  public navCtr: NavController
  ) {}

goToSetting(whoIs:string): void{

      switch(whoIs) {
        case 'General': {
            this.navCtr.push(GeneralPage);
            break;
        }
        case 'Services': {
            this.navCtr.push(ServicesPage);
            break;
        }
        case 'Meta': {
            this.navCtr.push(MetaPage);
            break;
        }
        case 'Gui': {
            this.navCtr.push(GuiPage);
            break;
        }
        case 'Maps': {
            this.navCtr.push(MapSettingsPage);
            break;
        }
        case 'Application': {
            this.navCtr.push(ApplicationPage);
            break;
        }
        case 'Tools': {
            this.navCtr.push(ToolsPage);
            break;
        }
        case 'Master': {
            this.navCtr.push(ServerFormPage);
            break;
        }
        default : {
          break; 
        }

       }
      }







}
