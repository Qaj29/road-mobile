import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AccountPage } from "../account/account";
import { RegisterPage } from '../register/register';
import { RoadProvider } from "../../providers/road/road";
import { PassrecoverPage } from "../passrecover/passrecover";
import { YournotificationPage } from "../yournotification/yournotification";
import { HomePage } from "../home/home";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    public loading: any;
    public user: any;
    public loginData = { email:'', password:'' };

    public id: number;
    public email: string;
    public name: string;
    public phone_number: string;
    public sur_name: string;
    public token: any;

    constructor(public road: RoadProvider, public navCtrl: NavController,public alertCtrl: AlertController,  public loadingCtrl: LoadingController, private toastCtrl: ToastController)
    {

    }
    goYourourNot(){
        if(localStorage.getItem('user_token')){
            this.navCtrl.push(YournotificationPage);
        }
        else{
            this.navCtrl.push(HomePage);
        }
    }

    doLogin() {
        if(this.loginData.email === '' || this.loginData.password === '') {
            let alert = this.alertCtrl.create({
                title: 'Sign in Error',
                subTitle: 'All fields are rquired',
                buttons:['OK']
            });
            alert.present();
            return;
        }


        this.road.execute(this.loginData, 'login').then((result) => {
            localStorage.setItem('user_token', JSON.stringify(result));
            if(result.hasOwnProperty('token')){
                this.showLoader();
            }else if(result.hasOwnProperty('message')){
                let errorAlert = this.alertCtrl.create({
                    title: 'Sign in error<br/>',
                    subTitle:  Object(result).message,
                    buttons:['OK']
                });
                errorAlert.present()
            }
        }, (err) => {
            this.presentToast(err);
        });
    }

    register() {
        this.navCtrl.push(RegisterPage);
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...',
            duration: 2000
        });

        this.loading.present();

        setTimeout(() => {
            this.navCtrl.push(AccountPage);
        }, 3000);
    }

    passRecover(){
        this.navCtrl.push( PassrecoverPage )
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