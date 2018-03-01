import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-school',
  templateUrl: 'school.html'
  
})


export class SchoolPage {
 
	schools: string[];
	errorMessage: string;

  constructor(public loadingCtrl: LoadingController,
          public navCtrl: NavController,
              public navParams: NavParams,
              private logger: RemoteServiceProvider) {
  }



  

  getSchools() {


    let loading = this.loadingCtrl.create({
        content: 'Espere...'
      });

      loading.present();

    this.logger.returnData("schools/1","",JSON.parse(localStorage.getItem('userData')).token)
       .subscribe(
         schools => this.schools = schools,
         error =>  this.errorMessage = <any>error,
          () => loading.dismiss() );
  }

  ionViewDidLoad() {
    this.getSchools()
  }


  goSchool(school_id) {

	this.navCtrl.setRoot(HomePage).then(() =>{
		localStorage.setItem('school_id', school_id);
		this.navCtrl.popToRoot();
	});

  }



}
