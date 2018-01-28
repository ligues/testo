import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
  selector: 'page-school',
  templateUrl: 'school.html'
  
})


export class SchoolPage {
 
	schools: string[];
	errorMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private logger: RemoteServiceProvider) {
  }



  

  getSchools() {
    this.logger.returnData("schools/1","",JSON.parse(localStorage.getItem('userData')).token)
       .subscribe(
         schools => this.schools = schools,
         error =>  this.errorMessage = <any>error);
  }

  ionViewDidLoad() {
    this.getSchools()
  }


  goSchool(school_id) {

	this.navCtrl.setRoot(TabsPage).then(() =>{
		localStorage.setItem('school_id', school_id);
		this.navCtrl.popToRoot();
	});

  }



}
