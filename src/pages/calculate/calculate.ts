import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import  './calculate';
import { HomePage } from "../home/home";
import { ShippingmethodPage } from "../shippingmethod/shippingmethod";
import { RentingPage } from "../renting/renting";

import { RoadProvider } from "../../providers/road/road";
import { HttpClient } from "@angular/common/http";
/**
 * Generated class for the CalculatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-calculate',
    templateUrl: 'calculate.html',
})
export class CalculatePage {
    calcData = { from: 'Riyadh', to: '', shipment_type: 'by_weight', car: '', weight: '', frosen: '' };
    cars: any;
    allCities: any = {};   // empty json, then set key token and pass in body
    result: any;
    total: any;

    constructor(public alertCtrl: AlertController, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public road: RoadProvider) {
        this.getAllCities();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CalculatePage');
    }

    goNotePage() {
        this.navCtrl.push(HomePage);
    }

    goRent(){
        this.navCtrl.push(RentingPage);
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
        this.calcData.car = '';

        if(this.calcData.from != '' && this.calcData.to != ''){
            this.getCar(this.calcData).then((result) => {
                this.cars = result;
            }, (err) => {
                console.log("Cars error: ",err);
            });
        }
    }

    getWeight(credentials){
        return this.road.execute(credentials, 'getCalculate');
    }

    doCalculate(){
        if(localStorage.getItem("carData")){
            localStorage.removeItem("carData");
        }
        localStorage.setItem("carData", JSON.stringify(this.calcData));
        this.getWeight(this.calcData).then((result) => {
            this.navCtrl.push(ShippingmethodPage, {
                total: result
            });
        }, (err) => {
            let errorAlert = this.alertCtrl.create({
                title: 'Calculating error<br/>',
                subTitle:  err.error.message,
                buttons:['OK']
            });
            errorAlert.present()
        });
    }

}
