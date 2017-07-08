import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { AlertPage } from '../alert/alert';
import { DataPage } from '../data/data';
import { SetupPage } from '../setup/setup';
import { HomePage } from '../home/home';
import { AisPage } from '../ais/ais';
import { PanelPage } from '../panel/panel';
import { SensorPage } from '../sensor/sensor';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AlertPage;
  tab3Root = DataPage;
  tab4Root = PanelPage;
  tab5Root = SensorPage;
  tab6Root = AisPage;
  tab7Root = SetupPage;
  tab8Root = AboutPage;

  constructor() {

  }
}
