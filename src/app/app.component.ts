import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
import { RentingPage} from "../pages/renting/renting";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage },
      { title: 'Confirm', component: ConfirmPage },
      { title: 'Account', component: AccountPage },
      { title: 'Calculate', component: CalculatePage },
      { title: 'Track', component: TrackPage },
      { title: 'Trackresult', component: TrackresultPage },
      { title: 'Shippingmethod', component: ShippingmethodPage },
      { title: 'Passrecover', component: PassrecoverPage },
      { title: 'Yournotification', component: YournotificationPage },
      { title: 'Personalinfo', component: PersonalinfoPage },
      { title: 'Checkout', component: CheckoutPage },
      { title: 'Renting', component: RentingPage },

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
