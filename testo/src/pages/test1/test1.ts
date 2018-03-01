import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { HomePage } from '../../pages/home/home';

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

  title: string;
 
	class_id: string;

	@ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,private logger: RemoteServiceProvider, public modalCtrl:ModalController) {
  }

  getSyllabuses() {

    var userPostData = {"type_id":localStorage.getItem('type_id')} 


    this.logger.returnData("syllabuses/"+localStorage.getItem('school_id'),userPostData,JSON.parse(localStorage.getItem('userData')).token)
       .subscribe(
         classes => this.classes = classes,
         error =>  this.errorMessage = <any>error);
  }

  ionViewDidLoad() {
    this.getSyllabuses()

    
    if(localStorage.getItem('type_id')==="1"){
      this.title = "Rápido";
    }
    else{
      this.title = "Completo";
    }

  }

  test(){

      let modal = this.modalCtrl.create(TestPage);
      modal.present();
  	
  }

}
