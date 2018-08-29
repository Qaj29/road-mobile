import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TrackresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trackresult',
  templateUrl: 'trackresult.html',
})
export class TrackresultPage {

  tracks: any;
  status = [];
  info= [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      if(localStorage.getItem('track')){
          this.tracks = JSON.parse(localStorage.getItem('track'));
      }
  }

  ionViewDidLoad() {
      for (let i = 0; i < this.tracks.data[0].task_history.length; i++) {

          let st = this.tracks.data[0].task_history[i].description.split(' ', 1);
          this.status.push(st[0]);

          let date = this.tracks.data[0].task_history[i].creation_datetime.split('T', 1);
          let time = this.tracks.data[0].task_history[i].creation_datetime.split('T');
          time = time[1].split(".", 1);

          let data = {
              status: st,
              date: date,
              time: time
          }
          this.info.push(data);
      }
  }

}
