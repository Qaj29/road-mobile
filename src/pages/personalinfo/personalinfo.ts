import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { YournotificationPage } from "../yournotification/yournotification";

import { RoadProvider } from "../../providers/road/road";

/**
 * Generated class for the PersonalinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-personalinfo',
  templateUrl: 'personalinfo.html',
})
export class PersonalinfoPage {


    bankData = {card_name: '', card_number: '', exire_date: '', secur_code: ''};

    lat: string;
    lng: string;

    date: string;
    time: string;
    job_pickup_phone: string;
    job_pickup_name: string;
    job_pickup_email: string;
    job_pickup_address: string;
   
    tasks = {
        job_hash: '',
        job_id: '',
        job_pickup_address: '',
        job_pickup_name: '',
        job_token: '',
        tracking_link: '',
        token: "$2y$10$072pgyNWNroa33yKO82Hv.h91zXXEJvq15ZWslWf0qHJkt2gphvri",
        payment: '',
        user_token:''
    };
  constructor(public navCtrl: NavController, public navParams: NavParams, public road: RoadProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
      let url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDJQpvrh6FiPeMjQTCu-8fAkyx2KBP_0GU';
      fetch(url, {method:'post'})
          .then(res => res.json())
          .then(res => {
              this.lat = res.location.lat;
              this.lng = res.location.lng;
          })
          .catch(err => console.log(err))
  }

  createTask(){
      let personal = {
          api_key:"57676884f107490749116c6a4d1021441be3c3fc2bd8793b5f15",
          order_id:"1",
          job_description: '',
          job_pickup_phone: this.job_pickup_phone,
          job_pickup_name: this.job_pickup_name,
          job_pickup_email: this.job_pickup_email,
          job_pickup_address: this.job_pickup_address,
          job_pickup_latitude: this.lat,
          job_pickup_longitude: this.lng,
          job_pickup_datetime: this.date+" "+this.time,
          pickup_custom_field_template:"Template_2",
          pickup_meta_data: [{"label":"Price","data":"100"},{"label":"Quantity","data":"100"}],
          team_id:"",
          auto_assignment:"0",
          has_pickup:"1",
          has_delivery:"0",
          layout_type:"0",
          tracking_link:1,
          timezone:"400",
          fleet_id:"",
          p_ref_images: ["http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png"],
          notify:1,
          tags:"",
          geofence: 0
      }

      fetch(this.road.task_url, {
            method: 'POST',
            body:  JSON.stringify(personal),
            headers: {
                "Content-type": "application/json"
            }
          })
          .then(res => res.json())
          .then(res => {

            console.log(res);

            if(res.status == 200){

              this.createTaskSuccess(res.data);

              let errorAlert = this.alertCtrl.create({
                  title: 'Task Message<br/>',
                  subTitle:  res.message,
                  buttons:['OK']
              });
              errorAlert.present()
              this.navCtrl.push(YournotificationPage);

            }else{
              let errorAlert = this.alertCtrl.create({
                  title: 'Sign in error<br/>',
                  subTitle:  res.message,
                  buttons:['OK']
              });
              errorAlert.present()
            }
          })
          .catch(err => console.log(err));
  }

    createTaskSuccess(data){
        this.tasks.job_hash = data.job_hash;
        this.tasks.job_id = data.job_id;
        this.tasks.job_pickup_address = data.job_pickup_address;
        this.tasks.job_pickup_name = data.job_pickup_name;
        this.tasks.job_token  =  data.job_token;
        this.tasks.tracking_link =  data.tracking_link;

        if(localStorage.getItem("user_token")) {
          let token = JSON.parse(localStorage.getItem("user_token"));
          this.tasks.user_token = token.token;
        }

        fetch(this.road.roadApiUrl+'createTask', {
            method: 'POST',
            body:  JSON.stringify(this.tasks),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
                console.log("Task created", res)
            })
         .catch(err => console.log("Task failed: ",err))
    }

}
