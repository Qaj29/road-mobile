import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { RoadProvider } from "../../providers/road/road";
import { LoginPage } from "../login/login";


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    loading: any;
    regData = { name:'', sur_name: '', email: '', phone_number: '',  password:'', password_confirmation: '', token: '$2y$10$072pgyNWNroa33yKO82Hv.h91zXXEJvq15ZWslWf0qHJkt2gphvri' };

    constructor(public navCtrl: NavController, public navParams: NavParams, public road: RoadProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

    doSignup() {
        this.showLoader();
        this.road.execute(this.regData, 'register').then((result) => {
            setTimeout(() => {
                this.navCtrl.push(LoginPage);
            }, 3000);

        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Registration...',
            duration: 2000
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