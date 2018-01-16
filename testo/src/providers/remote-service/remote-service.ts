import { HttpClient } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';

let apiUrl = 'http://localhost/testo/api/public/';



@Injectable()
export class RemoteServiceProvider {

  constructor(public http: HttpClient) {
    
  }


  postData(data,url,token) {
    
  	return new Promise((resolve, reject) => {
      let headers = new Headers();
    	//headers.append('Content-Type', 'application/x-www-form-urlencoded');
    	//headers.append('Access-Control-Allow-Origin', '*');
    	//headers.append('Accept', '*/*');
    	headers.append('Authorization', '' + token);

      this.http.post(apiUrl + url, JSON.stringify(data), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });



  }


}
