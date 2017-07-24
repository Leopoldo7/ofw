import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-master',
  templateUrl: 'master.html'
  
})
export class MasterPage {
  constructor(
    public navParams: NavParams
  ){}
}
