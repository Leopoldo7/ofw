import { Component, Input} from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {SignalK} from '../signalk/signalk';
import {ServerFormPage} from '../serverform/serverform';

declare var steelseries:any;
declare var moment:any;

@Component({
  selector: 'page-panel',
  templateUrl: 'panel.html'
})
export class PanelPage implements OnInit {

@Input() canvasGaugesTrue=0;
@Input() canvasGaugesTondo=0;
@Input() canvasGaugesSpeed=0;
@Input() canvasGaugesPress=0;

  

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
  public canvasTws:any;

  public canvasHEA:any;
  public canvasTD:any;
  public canvasVMG:any;
  public canvasTS:any;

  public canvasGroundWind:any;
  public canvasAirPres:any;
  public canvasWindChill:any;
  public canvasAWDS:any;
  public canvasSet:any;
  public canvasWaterTemp:any;
  public canvasOut:any;
  public canvasInt:any;

  public canvasCOGSOG:any;
  public canvasHEAD:any;
  public canvasDEP:any;
  public canvasLiveWell:any;
  public canvasWpt:any;
  public canvasDrift:any;
  public canvasWT:any;
  public canvasTime:any;

  public canvasSOGCOG:any;
  public canvasDP:any;
  public canvasHD:any;
  public canvasWINFO:any;

          

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
        this.handlecanvasGaugesTrue(jsonData);
        this.handlecanvasGaugesTondo(jsonData);
        this.handlecanvasGaugesSpeed(jsonData);
        this.handlecanvasGaugesPress(jsonData);
        
      
      }
  }



  handlecanvasGaugesTrue(json){
    if(json){
       if(json.updates){
          for(var i in json.updates){
            if(json.updates[i].values){
              for(var k in json.updates[i].values){
                var curr = json.updates[i].values[k];
                if(curr.path === "environment.wind.angleApparent"){
                    this.canvasGaugesTrue = curr.value;
                } 
              }
            }
          }}}}

  handlecanvasGaugesTondo(json){
    if(json){
       if(json.updates){
          for(var i in json.updates){
            if(json.updates[i].values){
              for(var k in json.updates[i].values){
                var curr = json.updates[i].values[k];
                if(curr.path === "environment.wind.directionChangeAlarm"){
                    this.canvasGaugesTondo = curr.value;
                } 
              }
            }
          }}}}

    handlecanvasGaugesSpeed(json){
    if(json){
       if(json.updates){
          for(var i in json.updates){
            if(json.updates[i].values){
              for(var k in json.updates[i].values){
                var curr = json.updates[i].values[k];
                if(curr.path === "environment.wind.speedApparent"){
                    this.canvasGaugesSpeed = curr.value;
                } 
              }
            }
          }}}}

    handlecanvasGaugesPress(json){
    if(json){
       if(json.updates){
          for(var i in json.updates){
            if(json.updates[i].values){
              for(var k in json.updates[i].values){
                var curr = json.updates[i].values[k];
                if(curr.path === "environment.wind.speedApparent"){
                    this.canvasGaugesPress = curr.value;
                } 
              }
            }
          }}}}








  handleWindSpeed(json){
    if(json){
       if(json.updates){
          for(var i in json.updates){
            if(json.updates[i].values){
              for(var k in json.updates[i].values){
                var curr = json.updates[i].values[k];

                if(curr.path === "navigation.speedOverGround"){ 
                    this.canvasSOG.setValue(curr.value); 
                    this.canvasVMG.setValue(curr.value);
                } 

                else if(curr.path === "navigation.position"){ //Setta il primo valore del Display con due parametri
                    this.canvasPosition.setValue(curr.value.latitude);
                    this.canvasPosition.setAltValue(curr.value.longitude)
                }

                else if(curr.path === "navigation.courseOverGroundTrue"){
                    this.canvasCOG.setValue(curr.value);
                } 

                else if(curr.path === "depth.belowTransducer"){ //Setta Depth
                    this.canvasDepth.setValue(curr.value);
                    this.canvasDEP.setValue(curr.value);
                    this.canvasDP.setValue(curr.value);
                }

                else if(curr.path === "navigation.headingMagnetic"){ 
                    this.canvasHeading.setValue(curr.value);
                    this.canvasHEA.setValue(curr.value);
                }

                else if(curr.path === "environment.wind.speedApparent"){ 
                    this.canvasSpeed.setValue(curr.value);
                    this.canvasAws.setValue(curr.value);
                }

                else if(curr.path === "environment.wind.angleApparent"){ 
                    this.canvasAwa.setValue(curr.value);
                    this.canvasGroundWind.setValue(curr.value);
                }

                else if(curr.path === "environment.wind.directionChangeAlarm"){ 
                    this.canvasTwd.setValue(curr.value);
                    this.canvasTD.setValue(curr.value);
                }

                else if(curr.path === "navigation.speedThroughWater"){ 
                    this.canvasTws.setValue(curr.value);
                    this.canvasTS.setValue(curr.value);
                }

                else if(curr.path === ""){ //Setta AirPres
                    this.canvasAirPres.setValue(curr.value);
                }

                else if(curr.path === "environment.water.temperature"){ 
                    this.canvasWindChill.setValue(curr.value);
                    this.canvasWaterTemp.setValue(curr.value);
                    this.canvasInt.setValue(curr.value);
                    this.canvasCOGSOG.setValue(curr.value);
                    this.canvasLiveWell.setValue(curr.value);
                    this.canvasWpt.setValue(curr.value);
                    this.canvasDrift.setValue(curr.value);
                    this.canvasWT.setValue(curr.value);
                    this.canvasSOGCOG.setValue(curr.value);
                }

                else if(curr.path === "environment.outside.temperature"){
                    this.canvasOut.setValue(curr.value);
                }

                else if(curr.path === "navigation.racing.timePortDown"){
                    this.canvasSet.setValue(curr.value);
                }

                else if(curr.path === "steering.autopilot.target.headingMagnetic"){ 
                    this.canvasHEAD.setValue(curr.value);
                    this.canvasHD.setValue(curr.value);
                }

                else if(curr.path === "navigation.datetime"){ 
                    if(moment(curr.value).isValid())
                        this.canvasTime.setValue(moment(curr.value).format("DD/MM/YYYY HH:mm:ss"));
                }

                else if(curr.path === ""){ 
                    this.canvasWINFO.setValue(curr.value);
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
               unitString: "",
               unitStringVisible: true,
               headerString: "COG",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasDepth = new steelseries.DisplaySingle('canvasDepth', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "Depth",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasHeading = new steelseries.DisplaySingle('canvasHeading', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "Heading",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasSpeed = new steelseries.DisplaySingle('canvasSpeed', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "Speed",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasAwa = new steelseries.DisplaySingle('canvasAwa', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "Awa",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasAws = new steelseries.DisplaySingle('canvasAws', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "Aws",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasTwd = new steelseries.DisplaySingle('canvasTwd', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "Twd",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasTws = new steelseries.DisplaySingle('canvasTws', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "TWS",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });
      
        this.canvasHEA = new steelseries.DisplaySingle('canvasHEA', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "HEADING(m)",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasTD = new steelseries.DisplaySingle('canvasTD', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "TWD",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasTS = new steelseries.DisplaySingle('canvasTS', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "TWS",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasVMG = new steelseries.DisplaySingle('canvasVMG', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "VMG",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasGroundWind = new steelseries.DisplaySingle('canvasGroundWind', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "Ground Wind(t)",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasAirPres = new steelseries.DisplaySingle('canvasAirPres', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "Air Press.",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasWindChill = new steelseries.DisplaySingle('canvasWindChill', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "T.WindChillTemp.",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

      this.canvasAWDS = new steelseries.DisplaySingle('canvasAWDS', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "AWD(t)/AWS",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });
      
        this.canvasSet = new steelseries.DisplaySingle('canvasSet', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "Set-Drift",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasWaterTemp = new steelseries.DisplaySingle('canvasWaterTemp', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "Water Temp.",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasOut = new steelseries.DisplaySingle('canvasOut', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "Out.Air.Temp",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasInt = new steelseries.DisplaySingle('canvasInt', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "Int-Humidity",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasCOGSOG = new steelseries.DisplayMulti('canvasCOGSOG', {
               width: 250,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "COG SOG",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

        this.canvasHEAD = new steelseries.DisplaySingle('canvasHEAD', {
               width: 200,
               height: 100,
               unitString: "m",
               unitStringVisible: true,
               headerString: "Heading(m)",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

        this.canvasDEP = new steelseries.DisplaySingle('canvasDEP', {
               width: 250,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "Depth(Transducer)",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });

        this.canvasLiveWell = new steelseries.DisplaySingle('canvasLiveWell', {
               width: 200,
               height: 100,
               unitString: "",
               unitStringVisible: true,
               headerString: "LiveWell",
               lcdDecimals: 1,
               headerStringVisible: true,
               lcdColor: steelseries.LcdColor.WHITE
            });
      
        this.canvasWpt = new steelseries.DisplayMulti('canvasWpt', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "WPT-INFO(t)",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasDrift = new steelseries.DisplayMulti('canvasDrift', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "SET-DRIFT",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasWT = new steelseries.DisplaySingle('canvasWT', {
            width: 200,
            height: 100,
            unitString: "°",
            unitStringVisible: true,
            headerString: "Water Temp.",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasTime = new steelseries.DisplaySingle('canvasTime', {
            width: 400,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "Time",
            fontHeight: "40",
            headerStringVisible: true,
            valuesNumeric: false,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasSOGCOG = new steelseries.DisplaySingle('canvasSOGCOG', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "COG SOG(t)",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasDP = new steelseries.DisplayMulti('canvasDP', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "Depth",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasHD = new steelseries.DisplaySingle('canvasHD', {
            width: 200,
            height: 100,
            unitString: "m",
            unitStringVisible: true,
            headerString: "Heading(m)",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })

        this.canvasWINFO = new steelseries.DisplaySingle('canvasWINFO', {
            width: 200,
            height: 100,
            unitString: "",
            unitStringVisible: true,
            headerString: "WPTINFO",
            lcdDecimals: 1,
            headerStringVisible: true,
            lcdColor: steelseries.LcdColor.WHITE
        })


    }

}

