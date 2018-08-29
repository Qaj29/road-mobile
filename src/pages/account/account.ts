import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { HttpClient } from "@angular/common/http";
import { LoginPage } from "../login/login";
import { YournotificationPage } from "../yournotification/yournotification";
import { CalculatePage } from "../calculate/calculate";
import 'rxjs/add/operator/map';

import { RoadProvider } from "../../providers/road/road";


/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})

export class AccountPage {
  isLoggedIn: boolean = false;
  public userDetails: any;

  public _token: string;
  constructor(public road: RoadProvider, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
      if(localStorage.getItem("user_token")) {
          let token = JSON.parse(localStorage.getItem("user_token"));
          this._token = token.token;
          this.isLoggedIn = true;
          this.getUserData();
      }else{
          this.navCtrl.push(LoginPage);
      }
  }

  logout(){
    localStorage.clear();
      setTimeout(() => {
          this.navCtrl.push(HomePage)
      }, 2000)

  }

  goNotePage (){
      this.navCtrl.push(YournotificationPage);
  }

  goShipPage (){
      this.navCtrl.push(CalculatePage);
  }

  getUserData() {
      if(this.isLoggedIn){
          return new Promise((resolve, reject) => {
              this.http.post(this.road.roadApiUrl+ 'getUser', {"user_token": this._token, "token": this.road.token },{})
                  .subscribe(res => {
                      this.userDetails = res;
                  }, (err) => {
                      console.log('Myaccount Error: ', err);
                  });
          });
      }else{
          this.navCtrl.push(LoginPage);
      }
  }


}
