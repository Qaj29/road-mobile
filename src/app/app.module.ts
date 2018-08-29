import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ConfirmPage } from '../pages/confirm/confirm';
import { AccountPage } from '../pages/account/account';
import { CalculatePage } from '../pages/calculate/calculate';
import { TrackPage } from '../pages/track/track';
import { TrackresultPage } from "../pages/trackresult/trackresult";
import { ShippingmethodPage } from "../pages/shippingmethod/shippingmethod";
import { PassrecoverPage } from "../pages/passrecover/passrecover";
import { YournotificationPage } from "../pages/yournotification/yournotification";
import { PersonalinfoPage } from "../pages/personalinfo/personalinfo";
import { CheckoutPage } from "../pages/checkout/checkout";
import { RentingPage } from "../pages/renting/renting";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RoadProvider } from '../providers/road/road';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ConfirmPage,
    AccountPage,
    CalculatePage,
    TrackPage,
    TrackresultPage,
    ShippingmethodPage,
    PassrecoverPage,
    YournotificationPage,
    PersonalinfoPage,
    CheckoutPage,
    RentingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      HttpClientModule,
      HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ConfirmPage,
    AccountPage,
    CalculatePage,
    TrackPage,
    TrackresultPage,
    ShippingmethodPage,
    PassrecoverPage,
    YournotificationPage,
    PersonalinfoPage,
    CheckoutPage,
    RentingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
    ],
    RoadProvider
  ]
})
export class AppModule {}
