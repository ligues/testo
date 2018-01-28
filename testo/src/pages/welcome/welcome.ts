import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../../pages/tabs/tabs';
import { SchoolPage } from '../../pages/school/school';



/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }


  goSchool(school_id) {

  	if(school_id==0){
  		this.navCtrl.push(SchoolPage);
  	}
  	else{

  		this.navCtrl.setRoot(TabsPage).then(() =>{
  			localStorage.setItem('school_id', "23");
		    this.navCtrl.popToRoot();
		});
  	}

    
  }


}
