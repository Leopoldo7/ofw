import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SignalK } from '../signalk/signalk';
import { ServerFormPage } from '../serverform/serverform';


declare var ol:any;


@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage implements OnInit {

   public map:any;
   public view:any = new ol.View({
                          center: ol.proj.transform([14.26824, 40.83033], 'EPSG:4326', 'EPSG:3857'),
                          zoom: 13
                        });

  public geolocation:any = new ol.Geolocation({
                                projection: this.view.getProjection()
                              }).on("change",function(){
                                
                              });

  public fill = new ol.style.Fill();
  public style = new ol.style.Style({
            fill: this.fill,
            stroke: new ol.style.Stroke({
              color: '#333',
              width: 2
            })
      });
    
  public features = new ol.Collection();

  public vectorSource = new ol.source.Vector({
    features: this.features
  });

  public vectorLayerShip = new ol.layer.Vector({
        source: this.vectorSource,
        style: this.style,
        title: "Ship Layer"
      });


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
    this.initMap();
  }


  initMap(){

    this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
              source: new ol.source.OSM()
          }),
          this.vectorLayerShip
        ],
        view: this.view,
        controls: ol.control.defaults({}).extend([
                  new ol.control.ZoomSlider(),
                  new ol.control.ScaleLine()
                ]),
    });

    //this.vectorSource.

  }





  handleData(data){

  }


  obtainServerAddrManually() {
    this.navCtrl.push(ServerFormPage);
  }

}
