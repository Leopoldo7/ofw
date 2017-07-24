import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Ng2OdometerModule } from 'ng2-odometer';

import { AboutPage } from '../pages/about/about';
import { DataPage } from '../pages/data/data';
import { SetupPage } from '../pages/setup/setup';
import { AlertPage } from '../pages/alert/alert';
import { HomePage } from '../pages/home/home';
import { GeneralPage } from '../pages/general/general';
import { ServicesPage } from '../pages/services/services';
import { MetaPage } from '../pages/meta/meta';
import { GuiPage } from '../pages/gui/gui';
import { MapsPage } from '../pages/maps/maps';
import { ApplicationPage } from '../pages/application/application';
import { ToolsPage } from '../pages/tools/tools';
import { TabsPage } from '../pages/tabs/tabs';
import { AisPage } from '../pages/ais/ais';
import { PanelPage } from '../pages/panel/panel';
import { SensorPage } from '../pages/sensor/sensor';
import { SignalK } from '../pages/signalk/signalk';
import { ServerFormPage } from '../pages/serverform/serverform';
import { MasterPage } from '../pages/master/master';

import {RadialGaugeComponent, LinearGaugeComponent} from '../../node_modules/ng-canvas-gauges/component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SetupPage,
    DataPage,
    AlertPage,
    HomePage,
    GeneralPage,
    ServicesPage,
    MetaPage,
    GuiPage,
    MapsPage,
    ApplicationPage,
    ToolsPage,
    AisPage,
    PanelPage,
    SensorPage,
    TabsPage,
    ServerFormPage,
    RadialGaugeComponent,
    MasterPage
  ],
  imports: [
    BrowserModule, FormsModule, Ng2OdometerModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SetupPage,
    DataPage,
    AlertPage,
    HomePage,
    GeneralPage,
    ServicesPage,
    MetaPage,
    GuiPage,
    MapsPage,
    ApplicationPage,
    ToolsPage,
    AisPage,
    PanelPage,
    SensorPage,
    TabsPage,
    ServerFormPage,
    MasterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SignalK,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
