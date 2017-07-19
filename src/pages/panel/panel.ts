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
  public canvasPosition:any;
  public canvasCOG:any;
  public canvasDepth:any;
  public canvasHeading:any;
  public canvasHEADING:any;
  public canvasSpeed:any;
  public canvasAwa:any;
  public canvasAws:any;
  public canvasTwd:any;
  public canvasTwD:any;
  public canvasTws:any;
  public canvasPEP:any;


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

                if(curr.path === "navigation.speedOverGround"){ 
                    this.canvasSOG.setValue(curr.value); //Setta il valore di  SOG
                } 

                else if(curr.path === "navigation.position.latitude"){ //Setta il primo valore del Display con due parametri
                    this.canvasPosition.setValue(curr.value);
                }

                else if(curr.path === "navigation.position.longitude"){ // Setta il secondo valore del Display con due parametri
                    this.canvasPosition.setAltValue(curr.value)
                } 

                else if(curr.path === "navigation.courseOverGroundTrue"){ //Setta COG
                    this.canvasCOG.setValue(curr.value);
                } 

                else if(curr.path === "depth.belowTransducer"){ //Setta Depth
                    this.canvasDepth.setValue(curr.value);
                }

                else if(curr.path === "navigation.headingMagnetic"){ //Setta Heading
                    this.canvasHeading.setValue(curr.value);
                }

                else if(curr.path === "environment.wind.speedApparent"){ //Setta Speed
                    this.canvasSpeed.setValue(curr.value);
                }

                else if(curr.path === "environment.wind.angleApparent"){ //Setta Awa
                    this.canvasAwa.setValue(curr.value);
                }

                else if(curr.path === "environment.wind.speedApparent"){ //Setta Aws
                    this.canvasAws.setValue(curr.value);
                }

                else if(curr.path === "environment.wind.directionChangeAlarm"){ //Setta Twd
                    this.canvasTwd.setValue(curr.value);
                }

                else if(curr.path === "navigation.speedThroughWater"){ //Setta Tws
                    this.canvasTws.setValue(curr.value);
                }

              }
            }
          }
       }
    }
  }


    initGadget(){

      this.canvasPosition = new steelseries.DisplayMulti('canvasPosition', {
          width: 400,
          height: 150,
          headerString: "POSITION",
          headerStringVisible: true,
          unitString: "Lat/Lon",
          unitStringVisible: true,
          lcdColor: steelseries.LcdColor.WHITE
      })


      this.canvasSOG = new steelseries.DisplaySingle('canvasSOG', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "SOG",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasCOG = new steelseries.DisplaySingle('canvasCOG', {
               width: 200,
               height: 100,
               unitString: "m/s",
               unitStringVisible: true,
               headerString: "COG",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasDepth = new steelseries.DisplaySingle('canvasDepth', {
               width: 200,
               height: 100,
               unitString: "m/s",
               unitStringVisible: true,
               headerString: "Depth",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasHeading = new steelseries.DisplaySingle('canvasHeading', {
               width: 200,
               height: 100,
               unitString: "m/s",
               unitStringVisible: true,
               headerString: "Heading",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasSpeed = new steelseries.DisplaySingle('canvasSpeed', {
               width: 200,
               height: 100,
               unitString: "m/s",
               unitStringVisible: true,
               headerString: "Speed",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasAwa = new steelseries.DisplaySingle('canvasAwa', {
               width: 200,
               height: 100,
               unitString: "m/s",
               unitStringVisible: true,
               headerString: "Awa",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasAws = new steelseries.DisplaySingle('canvasAws', {
               width: 200,
               height: 100,
               unitString: "m/s",
               unitStringVisible: true,
               headerString: "Aws",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasTwd = new steelseries.DisplaySingle('canvasTwd', {
               width: 200,
               height: 100,
               unitString: "m/s",
               unitStringVisible: true,
               headerString: "Twd",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasTws = new steelseries.DisplaySingle('canvasTws', {
               width: 200,
               height: 100,
               unitString: "m/s",
               unitStringVisible: true,
               headerString: "TWS",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });
      
        this.canvasPEP = new steelseries.DisplaySingle('canvasPEP', {
            width: 200,
            height: 100,
            unitString: "m/s",
            unitStringVisible: true,
            headerString: "TWS",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })
    }

}

