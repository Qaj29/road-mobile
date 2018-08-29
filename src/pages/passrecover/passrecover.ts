import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { RoadProvider } from "../../providers/road/road";

/**
 * Generated class for the PassrecoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passrecover',
  templateUrl: 'passrecover.html',
})
export class PassrecoverPage {

  public userMail = {email: ""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public road: RoadProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassrecoverPage');
  }

  doReset(){
    this.reset(this.userMail).then((result) => {
        setTimeout(() => {
            this.navCtrl.push(LoginPage)
        }, 1500);
    }, (err) => {
        console.log('babken: ', err)
    });
  }

  reset(email){
    return this.road.execute(email, 'passwordReset');
  }

}
