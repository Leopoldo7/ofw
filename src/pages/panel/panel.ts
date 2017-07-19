import { Component, Input} from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {SignalK} from '../signalk/signalk';
import {ServerFormPage} from '../serverform/serverform';

declare var steelseries:any;

@Component({
  selector: 'page-panel',
  templateUrl: 'panel.html'
})
export class PanelPage implements OnInit {

  @Input() courseover = 0;
  @Input() speedover = 0;
  @Input() depthbelowTransducer = 0;
  @Input() magneticVariation = 0;
  @Input() windSpeed = 0;

  public canvasSOG:any;
  public multiPosition:any;

  @Input() valoreInput: string = "10.00";
           


  constructor(
    public navCtrl: NavController,
    public signalK: SignalK,
    public events: Events
  ){
    this.events.subscribe('ws:message', (jsonData) => {
      this.handleData(jsonData);
    });
  }

  ngOnInit(){
    this.initGadget();
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
                if(curr.path === "navigation.courseOverGroundTrue"){ //environment.outside.temperature --> navigation.courseOverGroundTrue
                    //this.courseover = curr.value;
                    this.canvasSOG.setValue(curr.value); //Setta il valore di  SOG
                    this.multiPosition.setValue(curr.value); // Setta il primo valore del Display con due parametri
                    this.multiPosition.setAltValue(curr.value + 10)  // Setta il secondo valore del Display con due parametri
                } else if(curr.path === "navigation.speedOverGround"){
                    this.speedover = curr.value;
                } else if(curr.path === "depth.belowTransducer"){
                    this.depthbelowTransducer = curr.value;
                } else if(curr.path === "navigation.magneticVariation"){
                    this.magneticVariation = curr.value;
                } else if(curr.path === "environment.wind.speedApparent"){
                    this.windSpeed = curr.value;
                }
              }
            }
          }
       }
    }
  }


    initGadget(){

      this.canvasSOG = new steelseries.DisplaySingle('canvasSOG', {
               width: 150,
               height: 50,
               unitString: "m/s",
               unitStringVisible: true,
               headerString: "SOG",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.BEIGE
            });

      this.multiPosition = new steelseries.DisplayMulti('canvasPosition', {
          width: 150,
          height: 50,
          headerString: "POSITION",
          headerStringVisible: true,
          unitString: "Lat/Lon",
          unitStringVisible: true,
          lcdColor: steelseries.LcdColor.BEIGE
      })

    }

}

