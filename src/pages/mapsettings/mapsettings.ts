import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Settings from '../setup/settings';

@Component({
  selector: 'page-map_settings',
  templateUrl: 'mapsettings.html'
})
export class MapSettingsPage implements OnInit {
 constructor(
    public navCtrl: NavController
  ){}

  public selectedUnit:string;

  ngOnInit(){
    this.selectedUnit = Settings.settings.measureUnit;
  }
  setSettings(event:any){
    Settings.settings.measureUnit = this.selectedUnit;
  }
}
