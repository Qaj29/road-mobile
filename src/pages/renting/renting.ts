import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { RoadProvider } from "../../providers/road/road";
import {HomePage} from "../home/home";

/**
 * Generated class for the RentingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-renting',
  templateUrl: 'renting.html',
})
export class RentingPage {

  rentingData = {name:"" , email: "" , phone:"" , from:"Riyadh" , to:"" , car:"" , type:"daily" , message:"" , user_token:""};
    cars: any;
    allCities: any = {};   // empty json, then set key token and pass in body
    result: any;
    total: any;
    public loading: any;
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public road: RoadProvider) {
      this.getAllCities();
      if(localStorage.getItem("user_token")) {
          this.rentingData.user_token = localStorage.getItem("user_token");
      }
  }

    showLoader(){
      setTimeout(() => {
            this.navCtrl.push(HomePage);
        }, 3000);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentingPage');
  }

    getAllCities(){
        this.getCities(this.allCities).then((result) => {
            this.result = result;
        }, (err) => {
            console.log('Error get cities: ', err);
        });
    }

    getCities(credentials){
        return this.road.execute(credentials, 'getDelivery');
    }

    getCar(credentials){
        return this.road.execute(credentials, 'getCar');
    }

    getCars(){
        this.cars = [];
        this.rentingData.car = '';

        if(this.rentingData.from != '' && this.rentingData.to != ''){
            this.getCar(this.rentingData).then((result) => {
                this.cars = result;
            }, (err) => {
                console.log("Cars error: ",err);
            });
        }
    }

    goNotePage() {
        this.navCtrl.push(HomePage);
    }

    sendMail(credentials){
      return this.road.execute(credentials, 'sendMail')
    }

    doRenting(){
      let rentdata = this.rentingData;
      if(rentdata.car == '' || rentdata.name == '' || rentdata.email == '' || rentdata.phone == '' || rentdata.type == ''){
          let errorAlert = this.alertCtrl.create({
              title: 'Error<br/>',
              subTitle:  'All fileds with <b>*</b> are required.',
              buttons:['OK']
          });
          errorAlert.present();
          return;
      }else{
          this.loading = this.loadingCtrl.create({
              content: 'Booking...',
              duration: 3000
          });
      }
    this.sendMail(rentdata).then((result) => {
        this.loading.present();
        this.showLoader();
    }, (err) => {
        alert("try again please.")
    });
    }
}
