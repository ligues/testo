import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { SchoolPage } from '../../pages/school/school';
import { Test1Page } from '../../pages/test1/test1';
import { Test2Page } from '../../pages/test2/test2';
import { Test3Page } from '../../pages/test3/test3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})


export class HomePage {
 
	classes: string[];
	errorMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private logger: RemoteServiceProvider) {
  }

 

  goTest(testType) { 

    console.log(testType)
      
    switch(testType) {

      

        case "t1":
            this.navCtrl.push(Test1Page);
            break;
        case "t2":
            this.navCtrl.push(Test2Page);
            break;
        case "t3":
            this.navCtrl.push(Test3Page);
            break;
        default:
            //code block
    }


  }


    ionViewDidLoad() {
      
      
    }




}
