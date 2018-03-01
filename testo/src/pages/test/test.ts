import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { HomePage } from '../../pages/home/home';

import { TestPage } from '../../pages/test/test';
import { ResultPage } from '../../pages/result/result';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


export interface obj_question {
  question_id: number;
  answer: string;
  correct: number;
  answer_correct: string;
}

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})


export class TestPage {


  errorMessage: string;
  QuestionX: _question;
  public _answer: any[];
  public result: any[];

  public list_questions: Array<_question> = [];

  btn:string;

  data: string[]; 
  questions: string[]; 
  test_id:string;
  errorMessage: string;
 
  class_id: string;

  @ViewChild(Slides) slides: Slides;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private logger: RemoteServiceProvider,private alertCtrl: AlertController) {
    this.btn = "none";




  }

  getTest() {


     let loading = this.loadingCtrl.create({
        content: 'Espere...'
      });

      loading.present();


    var userPostData = {"school_id":localStorage.getItem('school_id'),"user_id":JSON.parse(localStorage.getItem('userData')).id,"type_id":localStorage.getItem('type_id')} 

    this.logger.returnData("tests/",userPostData,JSON.parse(localStorage.getItem('userData')).token)
       .subscribe(
         questions => this.questions = questions,
         error =>  this.errorMessage = <any>error,
         () => loading.dismiss() );
  }

  ionViewDidLoad() {

    


    this.getTest()
  }

  setData(d){
    this.questions = d.questions;
    this.test_id = d.test_id;
    
  }


 setAnswer(question_id, answer, correct, answer_correct) {


    this.QuestionX = < obj_question > {
      question_id: question_id,
      answer: answer,
      correct: correct,
      answer_correct: answer_correct
    }


    
  //debugger; 
    
    let x : number = 0; 
    
    if(this.list_questions.length===0){
      this.list_questions.push(this.QuestionX)
    }
    else{
       for (let question_tmp of this.list_questions) {
            if(question_tmp.question_id===question_id){
              question_tmp.answer = answer;
              question_tmp.correct = correct;
              x = 1;
              break;
            }
        }

        if(x==0){
          this.list_questions.push(this.QuestionX)
        }

    }
  
    console.log(this.list_questions);

  }

 
  slideChanged(){
    let currentIndex = this.slides.getActiveIndex();

    if(this.slides.isEnd()){
      this.btn = "inline-block";
    }

    
 

  }

  endTest(){

    if(this.list_questions.length===this.questions.length){



     let loading = this.loadingCtrl.create({
        content: 'Espere...'
      });

      loading.present();


      var userPostData = {"school_id":localStorage.getItem('school_id'),"user_id":JSON.parse(localStorage.getItem('userData')).id,"type_id":localStorage.getItem('type_id'),"answers":JSON.stringify(this.list_questions)} 

      this.logger.returnData("tests/add",userPostData,JSON.parse(localStorage.getItem('userData')).token)
         .subscribe(
           data => this.data = data,
           error =>  this.errorMessage = <any>error,
           () => this.closeTest(this.data,loading)
      );
         
    }
    else{
      let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Tienes preguntas pendientes por contestar',
          buttons: ['Aceptar']
        });
        alert.present();
    }

  }


  close(){


    let alert = this.alertCtrl.create({
    title: 'Cancelar', 
    message: '¿Deseas cancelar el examen?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          
        }
      },
      {
        text: 'Si',
        handler: () => {
          this.navCtrl.pop();
        }
      }
    ]
  });

  alert.present();

  }

  

  closeTest(d,l){

    let params = {
      test_id: d.test_id,
      total: d.total,
      corrects: d.corrects,
      result: d.result
    };

    l.dismiss();

      this.navCtrl.setRoot(ResultPage).then(() =>{
        this.navCtrl.popToRoot(params);
      });



  }
  

}
