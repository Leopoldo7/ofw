import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import * as Settings from '../setup/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
  public navCtr: NavController,
    public alertCtrl: AlertController
  ) {}

  public path:string  = Settings.settings.prodUrl;

  showRun() {
    let alert = this.alertCtrl.create({
      title: 'If you run a marina, a mooring or a docking company',
      subTitle: 'If your business is a mooring or docking company, small or big as well, FairWind coud make the stay of your customers even more delightful. Developing an ad hoc application, you could update the dock availability, manage the booking, advertise special offers and increase the fidelization level with a full social network intergation. More, you can track your customers as their boats are in the range of the available WiFi. Finally, you could improve your customers docking life offering news, weather, e-shop and rent all directly from on board.',
      buttons: ['OK']
    });
    alert.present();
  }

    showCruiser() {
    let alert = this.alertCtrl.create({
      title: 'If you are a cruiser',
      subTitle: 'Enjoy your coastal or open sea cruising getting more thanks to FairWind. Set your FairWind system on your boat as existing instruments improvement adding a new console provided by amazing Boat Apps. You can customize everything matching your boat style and your wallet. Record your boat data, share position with friends, manage a fleet to stay in touch with other boats. Get turistic information, improve your marine environment knowledge and more more more from BApps. Help to save the marine environment sharing data acquired by your boat with potentially never ending amount of scientists. Finally, at last but not the least, if you have ideas for new BApps and you can develop them, go on and share. If you have an idea for a new BApp, contact us. We will help you to make it working.',
      buttons: ['OK']
    });
    alert.present();
  }

    showElettronic() {
    let alert = this.alertCtrl.create({
      title: 'If you build marine electronics',
      subTitle: 'L Internet of Things diventerà il più grande mercato del mondo e consentirà alle aziende di risparmiare miliardi di dollari. FairWind ora e OSP (Open Sailing Processor) nasce per portare Internet of Things fra le onde e nel vento. Se produci strumenti elettronici per la nautica questo è il momento giusto per innovare. Il movimento DIY, Do It by Yourself ha creato schere di creativi, i Makers, pronti ad applicare la loro tecnologia da artigiani del nuovo millennio per l innovazione della nautica da diporto. FairWind nasce per funzionare con qualsiasi hardware.',
      buttons: ['OK']
    });
    alert.present();
  }

  showDeveloper() {
    let alert = this.alertCtrl.create({
      title: 'If You Are a Developer',
      subTitle: 'You are in your heaven. You can unchain your imagination (and your business) creating FairWind Boat Apps using the same technology already used for commonly spread Android mobile apps, but interacting with boats and the marine environment. The FairWind SDK will be soon freely available with any needed tool for BApp design, development and testing fully integrated in Android Studio. Just create a new project and hoist your sails.',
      buttons: ['OK']
    });
    alert.present();
  }


  showBoat() {
    let alert = this.alertCtrl.create({
      title: 'If You Are a Boat Builder',
      subTitle: 'Don t care about the size of your business or the size of the boat you deal with, you can embed FairWind in a new or refitted boat in a really straightforward way. Configure your central processing unit, connect it to the existing branded marine electronics network or directly to transducers (or both, there are no limits), download the FairWind software and customize it You can develop ad hoc Boat Apps (BApps) in order to control the boat and then improve your customer satisfaction offering new BApps as aftermarket upgrade. If you need help in FairWind customization you can contact us: the Department of Science and Technology could set an agreement with the boat builder that will be charged in support FairWind research and development. If you are interested or simply curious, do not hesitate to contact us.',
      buttons: ['OK']
    });
    alert.present();
  }


  showFishman() {
    let alert = this.alertCtrl.create({
      title: 'If You Are a Fisherman',
      subTitle: 'La conoscenza del campo di gioco è fondamentale in qualasiasi sport, questo vale anche per la pesca. Gli sviluppatori di FairWind hanno un background in tecnologie per l oceanografia che orma, grazie agli strumenti più economici, è possibile adattare al mercato degli hobbisti e dei semi professionisti. Usa il tuo scandaglio e gli altri strumenti di bordo per acquisire i dati necessari per meglio definire le tue aree di pesca. Condividi (o non condividi) i tuo segreti con amici e colleghi. Non solo, se vuoi, puoi rendere i tuoi dati anonimi e condivisi con la comunità in modo da aiutare la salvaguardia dell ambiente marino.',
      buttons: ['OK']
    });
    alert.present();
  }


  showClub() {
    let alert = this.alertCtrl.create({
      title: 'If you run or belong to a yachting club',
      subTitle: 'Make the brotherhood among your club members stronger and stronger with a FairWind BApp. Your sailing club could offer on board services ad docking, safelty, restaurant and more! If you organize sport events as sailing or powerboat races you can track the contenders, so the shore supportes can follow their heroes on the web or using mobile devices. Finally you can manage fleets for social cruises and social day sailing.',
      buttons: ['OK']
    });
    alert.present();
  }


   showCharter() {
    let alert = this.alertCtrl.create({
      title: 'If you are a Charter',
      subTitle: 'If you run a charter company with a consistent fleet or you rent your boat just sometimes in order to balance the ownership expenses, your need is the same: knowing where the boat or the fleet is sailing in order to improve the safeness of guests and boats. FairWind is able to store every monitored boat parameter (position, weather, depth, engine, batteries) at regular intervals on its internal storage and occasionally send everything on the land when a stable internet connection is available. This is possible thanks to the cloud computing technology and, in particular, by the Globus services developed at the University of Chicago and at the Argonne National Laboratory. Make effective your business managing the boat in the way she will be ready for the next sailing because you know if there is some critical issues to be checked in advance. The FairWind software, thanks to the Boat Apps (BApps), is fully customizable with features that improve the experience of your guests that can share everything on the social networks directly from the boat interface replicated on their handheld devices as tablet, smartphones and e-readers. What if a group of guests is distributed on more than one boat? With FairWind you can manage ephemeral private fleets in a dynamic and fun way. If you are interested or simply curious, do not hesitate to contact us following this link.',
      buttons: ['OK']
    });
    alert.present();
  }


  showScientist() {
    let alert = this.alertCtrl.create({
      title: 'If you are a Scientist',
      subTitle: 'FairWind act as research kit for marine data collection especially dedicated to coastal environment management and protection. Collected data could be shared with the scientist community and redistributed to the world as open big data. FairWind uses the cloud based as, but not limited to, Globus service (https://www.globus.org) to send collected data when a valid internet connection is available. Depth sounders collected by FairWind users can make better open and commercial marine charts. The marine protected areas could have great benefits pushing the use of FairWind as a continuos, environmental friendly, data crowdsourcing.',
      buttons: ['OK']
    });
    alert.present();
  }


  showWork() {
    let alert = this.alertCtrl.create({
      title: 'If you work in education',
      subTitle: 'FairWind could be used as a electronic instrument simulator playingback real situations or idealized cases. With FairWind you can reproduce the behaviour of expansive marine electronics without buy a complete set of real ones. In this way your students could be skilled for real sea conditions.',
      buttons: ['OK']
    });
    alert.present();
  }


  showRacer() {
    let alert = this.alertCtrl.create({
      title: 'If you are a Racer',
      subTitle: 'We know you. We are sailing racer too. FairWind is great for you whatever you challenge in club races or you are planning to win a world championship: you could have your console, record you data, create new optimized setup to get faster! Having polars is just the first step. Connect any kind of sensors to FairWind, perform evaluations and make FairWind your best crewmember (it will be aboard even when it rains without complaining). There are many devices doing this, but no one has BApps and... is open technology. Finally, at last but not the least, if you have ideas for new BApps and you can develop them, go on and share. If you have an idea for a new BApp, contact us. We will help you to make it working.',
      buttons: ['OK']
    });
    alert.present();
  }
  

  showPower() {
    let alert = this.alertCtrl.create({
      title: 'If you are a Powerboat lover',
      subTitle: 'Con FairWind puoi monitorare i parameri dei tuoi motori sia usando i dati raccolti dal CAN Bus (tramite un gateway NMEA 2000) oppure utilizzando direttamente i sensori collegati ai modulti Servant. Ad esempio un accelerometro solidale con il motore può acqusire importanti dati sulle vibrazioni che poi, una volta a terra, possono essere analizzati e messi in relazione con il funzionamento delle macchine. Poter creare Boat App interfacciate ai propri motori rende la possibilità di innovazione senza fine.',
      buttons: ['OK']
    });
    alert.present();
  }

}
