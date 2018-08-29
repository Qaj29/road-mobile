import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PersonalinfoPage } from "../personalinfo/personalinfo";

/**
 * Generated class for the ShippingmethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shippingmethod',
  templateUrl: 'shippingmethod.html',
})


export class ShippingmethodPage {
  public result: any;
  public price: any;
  constructor( public navCtrl: NavController, public navParams: NavParams ) {
      if(localStorage.getItem("carData")){
          this.result = JSON.parse(localStorage.getItem("carData"));
      }
      this.price = navParams.get('total')
  }
    goPersonalPage(){
        this.navCtrl.push(PersonalinfoPage);
    }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ShippingmethodPage');
  }

}
