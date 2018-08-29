import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

import { HomePage } from '../home/home';
import { TrackresultPage } from "../trackresult/trackresult";

import { RoadProvider } from "../../providers/road/road";

/**
 * Generated class for the TrackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-track',
  templateUrl: 'track.html',
})
export class TrackPage {

  loading: any;
  job_id: "";
  result: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: HttpClient, public road: RoadProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackPage');
  }

  tracking(data){
      return new Promise((resolve, reject) => {
          this.http.post(this.road.trackUrl, JSON.stringify(data), {headers: {"Content-type": "application/json"}})
              .subscribe(res => {
                  resolve(res);
              }, (err) => {
                  reject(err);
              });
      });
  }

    trackSearch(){
        let data = {
            api_key: "57676884f107490749116c6a4d1021441be3c3fc2bd8793b5f15",
            "job_id": this.job_id,
            "user_id": 54811
        };

      this.tracking(data).then((res) => {
          if(localStorage.getItem('track')){
              localStorage.removeItem('track')
          }
          localStorage.setItem('track', JSON.stringify(res));
          this.navCtrl.push(TrackresultPage)

      }, (err) => {
          console.log('Error: ', err);
      });


    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Tracking...'
        });

        this.loading.present();
    }

    goHome(){
        this.navCtrl.push(HomePage);
    }

}
