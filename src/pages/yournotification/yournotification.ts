import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { CalculatePage } from '../calculate/calculate';
import { TrackPage } from "../track/track";

import { RoadProvider } from "../../providers/road/road";

/**
 * Generated class for the YournotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yournotification',
  templateUrl: 'yournotification.html',
})
export class YournotificationPage {
  userNotes = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public road: RoadProvider) {
      if(localStorage.getItem('user_token')){
          this.getUserThen();
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YournotificationPage');
  }

    goTrack(){
        this.navCtrl.push(TrackPage);
    }

  accountFn() {
    this.navCtrl.push(AccountPage);
  }

  calcultaeFn() {
      this.navCtrl.push(CalculatePage);
  }

  getUserThen(){
      let user_token = JSON.parse(localStorage.getItem('user_token'));
      this.getUserNotes({"user_token": user_token.token}).then((result) => {
          this.userNotes.push(result)
          console.log('your data: ',this.userNotes)
      }, (err) => {
          console.log("Error getting data: ", err)
      });
  }

  getUserNotes(credentials){
     return this.road.execute(credentials, 'getTasks');
  }

}
