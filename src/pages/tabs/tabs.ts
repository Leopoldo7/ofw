import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { AlertPage } from '../alert/alert';
import { DataPage } from '../data/data';
import { SetupPage } from '../setup/setup';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AlertPage;
  tab3Root = DataPage;
  tab7Root = SetupPage;
  tab8Root = AboutPage;

  constructor() {

  }
}
