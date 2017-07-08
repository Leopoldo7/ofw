import { Component, Input} from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {SignalK} from '../signalk/signalk';
import {ServerFormPage} from '../serverform/serverform';

@Component({
  selector: 'page-panel',
  templateUrl: 'panel.html'
})
export class PanelPage {

  @Input() windSpeed = 0;
  @Input() battery = 0;
  @Input() temperature = 0;
           


  constructor(
    public navCtrl: NavController,
    public signalK: SignalK,
    public events: Events
  ){
    this.events.subscribe('ws:message', (jsonData) => {
      this.handleData(jsonData);
    });
  }

  obtainServerAddrManually() {
    this.navCtrl.push(ServerFormPage);
  }


  handleData(jsonData){
     //console.info("Arrivato un dato")
      //console.info(jsonData)
      if(jsonData){
        jsonData = JSON.parse(jsonData);
        this.handleWindSpeed(jsonData);
        
      
      }
  }

  handleWindSpeed(json){
    if(json){
       if(json.updates){
          for(var i in json.updates){
            if(json.updates[i].values){
              for(var k in json.updates[i].values){
                var curr = json.updates[i].values[k];
                if(curr.path === "navigation.courseOverGroundTrue"){ //environment.wind.speedTrue
                    this.windSpeed = curr.value;
                } else if(curr.path === "navigation.courseOverGroundTrue"){//environment.outside.temperature
                    this.temperature = curr.value;
                } else if(curr.path === "electrical.batteries.0.voltage"){
                    this.battery = curr.value;
                }
              }
            }
          }
       }
    }
  }

}

