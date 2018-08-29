import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController} from "ionic-angular";



const httpOptions = {
    headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
        "Accept": "application/json"
    })
};
/*
  Generated class for the RoadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoadProvider {
  public roadApiUrl = 'http://roadcobox.com/api/';
  public task_url = 'https://api.tookanapp.com/v2/create_task';
  public trackUrl = 'https://private-94a12-tookanapi.apiary-proxy.com/v2/get_task_details';
  public headers = {headers: httpOptions.headers};
  public isLoggedIn: boolean = false;
  public token = "$2y$10$072pgyNWNroa33yKO82Hv.h91zXXEJvq15ZWslWf0qHJkt2gphvri";

  public user_token: string;
  constructor(public http: HttpClient, public alert: AlertController) {
    console.log('Hello RoadProvider Provider');

  }

  execute(credentials, path, can_change_url = ''){
      let url = '';
      if(can_change_url){
          url = this.task_url
      }else{
          url = this.roadApiUrl + path;
      }
      credentials.token = this.token;
      return new Promise((resolve, reject) => {
          this.http.post(url, JSON.stringify(credentials), this.headers)
              .subscribe(res => {
                  resolve(res);
                  console.log("Best result: ",res);
              }, (err) => {
                  reject(err);
                  console.log("Yo're wrong: ", err)
              });
      });
  }

}
