import { Component, Input } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {SignalK} from '../signalk/signalk';
import {ServerFormPage} from '../serverform/serverform';

@Component({
  selector: 'page-panel',
  templateUrl: 'panel.html'
})
export class PanelPage {

  @Input() oilPressureValuePropulsione0 = 0;
  @Input() oilPressureValuePropulsione1 = 0;


  constructor(
    public navCtrl: NavController,
    public signalK: SignalK,
    private events: Events
  ){
    this.events.subscribe('ws:message', (jsonData) => {
      this.handleData(jsonData);
    });

  }


  obtainServerAddrManually() {
    this.navCtrl.push(ServerFormPage);
  }


  handleData(jsonData){
      console.info("Arrivato un dato")
      console.info(jsonData)
      if(jsonData){
        jsonData = JSON.parse(jsonData);
        this.handleOilPressure(jsonData);
      
      }
  }

  handleOilPressure(json){
    if(json){
       if(json.updates){
          for(var i in json.updates){
            if(json.updates[i].values){
              for(var k in json.updates[i].values){
                var curr = json.updates[i].values[k];
                if(curr.path === "propulsion.1.transmission.oilPressure"){
                    this.oilPressureValuePropulsione1 = curr.value/1000;
                } else if(curr.path === "propulsion.0.transmission.oilPressure"){
                    this.oilPressureValuePropulsione0 = curr.value/1000;
                }
              }
            }
          }
       }
    }
    
  }
}

