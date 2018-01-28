import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

let apiUrl = 'https://ligues.com.mx/testo/public/';



@Injectable()
export class RemoteServiceProvider {

  constructor(public http: HttpClient) {
    
  }


  postData(url,data,token) {
    
  	return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      if(token){
        headers = headers.set('Authorization', token);
      }

      this.http.post(apiUrl + url, JSON.stringify(data), {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }


  returnData(url,data,token): Observable<string[]> {

     let headers = new HttpHeaders();
      if(token){
        headers = headers.set('Authorization', token);
      }


    return this.http.post(apiUrl + url, JSON.stringify(data), {headers: headers}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

}
