import { Component } from '@angular/core';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AccountPage } from '../account/account';
import { CalculatePage } from '../calculate/calculate';
import { YournotificationPage } from "../yournotification/yournotification";
import { TrackPage } from "../track/track";
import './home';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    loading: any;
    isLoggedIn: boolean = false;

    constructor(public app: App, public navCtrl: NavController, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

    }

    ionViewDidLoad() {
        if(localStorage.getItem("user_token")) {
            this.isLoggedIn = true;
            this.navCtrl.push(YournotificationPage);
        }

    }

    goTrack(){
        this.navCtrl.push(TrackPage);
    }

    accountFn() {
        if(this.isLoggedIn){
            this.navCtrl.push(AccountPage);
        }else{
            this.navCtrl.push(LoginPage);
        }
    }

    calcultaeFn() {
        this.navCtrl.push(CalculatePage);
    }


    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }




}