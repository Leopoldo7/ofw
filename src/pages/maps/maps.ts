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
   public zoom:number = 15;
   public imageMarker:string = 'assets/img/maps/ship.png';
   public fromProjection:string = "EPSG:4326";
   public toProjection:string = "EPSG:3857";

   public features = new ol.Collection();


   public view:any = new ol.View({
                          center: ol.proj.transform([14.26824, 40.83033], this.fromProjection, this.toProjection),
                          zoom: this.zoom
                        });

  public geolocation = new ol.Geolocation({
        tracking: true
      });

  
  public style = new ol.style.Style({
            image: new ol.style.Icon({
              src: this.imageMarker,
              anchor: [0.5, 0.5],
              scale: 0.30
            })
      });
    

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

    //Prende la posizione attuale
    if(this.geolocation && this.geolocation.getTracking()){
     
      /*var positionActual = this.geolocation.getPosition();
      
      if(positionActual){
        this.view.setCenter([parseFloat(positionActual[0]), parseFloat(positionActual[1])]);
        this.view.setZoom(this.zoom);
      }*/
      var viewer = this.view;
      var zoommer = this.zoom;
      var fmProj = this.fromProjection;
      var toProj = this.toProjection;
      /* NON so se va bene per una nave che va sempre in movimento */
      this.geolocation.on('change', function() {
        
          var p = this.getPosition();
          viewer.setCenter(ol.proj.transform([p[0],p[1]], fmProj, toProj));
          viewer.setZoom(zoommer);
        
      });

    }


  }


  handleData(json){
      if(json){
      json = JSON.parse(json);
       if(json.updates){
          for(var i in json.updates){
            if(json.updates[i].values){
              for(var k in json.updates[i].values){
                var curr = json.updates[i].values[k];

                if(curr.path === "navigation.position"){

                    var pos = curr.value;
                    if(pos.longitude && pos.latitude){

                      var feature = new ol.Feature({
                          geometry: new ol.geom.Point(ol.proj.transform([pos.longitude, pos.latitude], this.fromProjection, this.toProjection)),
                          name: 'La mia nave'
                        })
                        //{"longitude":-122.833183,"latitude":48.234501}
                        feature.setId("mia_nave");
                        if(this.vectorSource.getFeatureById("mia_nave"))
                          this.vectorSource.removeFeature(this.vectorSource.getFeatureById("mia_nave"));
                        this.vectorSource.addFeature(feature);
                        this.view.setCenter(ol.proj.transform([pos.longitude,pos.latitude], this.fromProjection, this.toProjection));
                        this.view.setZoom(this.zoom);
                    }
                }
              }
            }
          }
        }
      }
  }


  obtainServerAddrManually() {
    this.navCtrl.push(ServerFormPage);
  }

}
