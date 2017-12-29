import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SignalK } from '../signalk/signalk';
import { ServerFormPage } from '../serverform/serverform';
import { ElementRef, ViewChild } from '@angular/core';
import * as Settings from '../setup/settings';


declare var ol:any;


@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage implements OnInit {

   public map:any;
   public zoom:number = 13;
   public imageMarker:string = 'assets/img/maps/ship.png';
   public fromProjection:string = "EPSG:4326";
   public toProjection:string = "EPSG:3857";
   public maxMoviments:number = 200;
   public countMoviments:number = this.maxMoviments;

  public wgs84Sphere = new ol.Sphere(6378137);
  public source = new ol.source.Vector();
  public output:any = "0";
  public draw; 
  public sketch:any;
  public helpTooltipElement;
  public helpTooltip;
  public measureTooltipElement;
  public measureTooltip;
  public continuePolygonMsg = 'Click to continue drawing the polygon';
  public continueLineMsg = 'Click to continue drawing the line';
  @ViewChild("areaChk") areaChk: ElementRef;

   
   public features = new ol.Collection();
   public view:any = new ol.View({
                          center: ol.proj.transform([14.26824, 40.83033], this.fromProjection, this.toProjection),
                          zoom: this.zoom
                        });

  /*public geolocation = new ol.Geolocation({
        tracking: true
      });*/

  
  public selectDirection(feature, resolution): any{
    console.info(feature.get("id"));
    var markerImage = this.imageMarker;
    var style = new ol.style.Style({
            image: new ol.style.Icon({
              src: markerImage,
              anchor: [0.5, 0.5],
              scale: 0.30
            })
      });
  return style;
  }
    

  public vectorSource = new ol.source.Vector({
    features: this.features
  });

  public vectorLayerShip = new ol.layer.Vector({
        source: this.vectorSource,
        style: this.selectDirection.bind(this),
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

   // ol.inherits(this.myControl, ol.control.Control);

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
                  new ol.control.ScaleLine(),
                  new ol.control.MousePosition()
                ])
    });

    this.map.on('pointermove', this.pointerMoveHandler.bind(this));
    this.addInteraction();
    //Prende la posizione attuale
    /*if(this.geolocation && this.geolocation.getTracking()){
     
      var positionActual = this.geolocation.getPosition();
      
      if(positionActual){
        this.view.setCenter([parseFloat(positionActual[0]), parseFloat(positionActual[1])]);
        this.view.setZoom(this.zoom);
      }

      /*var viewer = this.view;
      var zoommer = this.zoom;
      var fmProj = this.fromProjection;
      var toProj = this.toProjection;
      
      this.geolocation.on('change', function() {
        
          var p = this.getPosition();
          viewer.setCenter(ol.proj.transform([p[0],p[1]], fmProj, toProj));
          viewer.setZoom(zoommer);
        
      });

    }*/


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
                        if(this.countMoviments == this.maxMoviments) {
                          this.view.setCenter(ol.proj.transform([pos.longitude,pos.latitude], this.fromProjection, this.toProjection));
                          this.view.setZoom(this.zoom);
                          this.countMoviments = 0;
                        }
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


  changeStatus(evt){
    this.addInteraction();
  }
 pointerMoveHandler(evt) {
  if (evt.dragging) {
    return;
  }
  /** @type {string} */
  var helpMsg = 'Click to start drawing';
  /** @type {ol.Coordinate|undefined} */
  var tooltipCoord = evt.coordinate;
  if (this.sketch) {
    
    var geom = (this.sketch.getGeometry());
    if (geom instanceof ol.geom.Polygon) {
      this.output = this.formatArea(/** @type {ol.geom.Polygon} */ (geom));
      helpMsg = this.continuePolygonMsg;
      tooltipCoord = geom.getInteriorPoint().getCoordinates();
    } else if (geom instanceof ol.geom.LineString) {
      this.output = this.formatLength( /** @type {ol.geom.LineString} */ (geom));
      helpMsg = this.continueLineMsg;
      tooltipCoord = geom.getLastCoordinate();
    }
    //this.measureTooltipElement.innerHTML = output;
    //this.measureTooltip.setPosition(tooltipCoord);
  }

  //this.helpTooltipElement.innerHTML = helpMsg;
  //this.helpTooltip.setPosition(evt.coordinate);
};


addInteraction() {
  var isArea = false;
  //this.areaChk.nativeElement.checked;
  console.info("Is area?" + isArea);
  var type =  ( isArea ? 'Polygon' : 'LineString' );
  this.draw = new ol.interaction.Draw({
    source: this.source,
    type: /** @type {ol.geom.GeometryType} */ (type),
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  });


  this.draw.on('drawstart',
  function(evt) {
        // set sketch
        this.sketch = evt.feature;
      }.bind(this));

  this.draw.on('drawend',
      function(evt) {
        //this.measureTooltipElement.className = 'tooltip tooltip-static';
        //this.measureTooltip.setOffset([0, -7]);
        // unset sketch
        this.sketch = null;
        this.output = "0";
        // unset tooltip so that a new one can be created
        //this.measureTooltipElement = null;
        //this.createMeasureTooltip();
      }.bind(this));

  this.map.addInteraction(this.draw);

  //this.createMeasureTooltip();
  //this.createHelpTooltip();

  
}


/**
 * Creates a new help tooltip
 */
createHelpTooltip() {
  if (this.helpTooltipElement) {
    this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
  }
  this.helpTooltipElement = document.createElement('div');
  this.helpTooltipElement.className = 'tooltip';
  this.helpTooltip = new ol.Overlay({
    element: this.helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left'
  });
  this.map.addOverlay(this.helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
 createMeasureTooltip() {
  if (this.measureTooltipElement) {
    this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
  }
  this.measureTooltipElement = document.createElement('div');
  this.measureTooltipElement.className = 'tooltip tooltip-measure';
  this.measureTooltip = new ol.Overlay({
    element: this.measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  this.map.addOverlay(this.measureTooltip);
}


/**
 * format length output
 * @param {ol.geom.LineString} line
 * @return {string}
 */
formatLength(line) {
  var length;
  this.output = "0";
  
    var coordinates = line.getCoordinates();
    length = 0;
    var sourceProj = this.map.getView().getProjection();
    for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
      var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
      length += this.wgs84Sphere.haversineDistance(c1, c2); //Return meter
    }

  if(Settings.settings.measureUnit == "meters"){
    if (length > 100) {
      this.output = (Math.round(length / 1000 * 100) / 100) +
          ' ' + 'km';
    } else {
      this.output = (Math.round(length * 100) / 100) +
          ' ' + 'm';
    }
  } else if(Settings.settings.measureUnit == "miles") {
      this.output = (length * 0.000621371).toFixed(2) + '' + ' miglia';
  }

  return this.output;
};


/**
 * format length output
 * @param {ol.geom.Polygon} polygon
 * @return {string}
 */
formatArea(polygon) {
  var area;
  this.output = "0";

    var sourceProj = this.map.getView().getProjection();
    var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
        sourceProj, 'EPSG:4326'));
    var coordinates = geom.getLinearRing(0).getCoordinates();
    area = Math.abs(this.wgs84Sphere.geodesicArea(coordinates));

  if (area > 10000) {
    this.output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
  } else {
    this.output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
  }
  return this.output;
};


}
