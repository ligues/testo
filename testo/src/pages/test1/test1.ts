import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { TestPage } from '../../pages/test/test';

/**
 * Generated class for the Test1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test1',
  templateUrl: 'test1.html',
})
export class Test1Page {

	classes: string[];
	errorMessage: string;

	class_id: string;

	@ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,private logger: RemoteServiceProvider) {
  }

  getSyllabuses() {
    this.logger.returnData("syllabuses/"+localStorage.getItem('school_id'),"",JSON.parse(localStorage.getItem('userData')).token)
       .subscribe(
         classes => this.classes = classes,
         error =>  this.errorMessage = <any>error);
  }

  ionViewDidLoad() {
    this.getSyllabuses()
    this.slides.lockSwipeToNext(true);
  }

  setClass(class_id){
  	this.slides.lockSwipeToNext(false);	
  	localStorage.setItem('class_id',class_id);
  }

  test(){

      this.navCtrl.setRoot(TestPage).then(() =>{
        this.navCtrl.popToRoot();
      });
  	
  }

}
