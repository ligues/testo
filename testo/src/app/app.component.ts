import { Component, ViewChild } from '@angular/core';
import { App,Platform,MenuController,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SchoolPage } from '../pages/school/school';
import { Test1Page } from '../pages/test1/test1';
import { Test2Page } from '../pages/test2/test2';
import { Test3Page } from '../pages/test3/test3';
import { TestPage } from '../pages/test/test';
import { ResultPage } from '../pages/result/result';

@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
  @ViewChild('content') nav: NavController

  rootPage:any;

  constructor(public menuCtrl: MenuController,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public app: App) {
    platform.ready().then(() => {
      
      const token = localStorage.getItem('userData');
      const school_id = localStorage.getItem('school_id');

      if (token  &&  school_id) { 
        this.rootPage = HomePage; 
      } else if(token) {
        this.rootPage = WelcomePage;
      } 
      else{
        this.rootPage = LoginPage;
      }


      statusBar.styleDefault();
      splashScreen.hide();
    });
  }



  logout(){
    
    localStorage.removeItem('userData');

    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);


  }


  openWelcome(){

    this.menuCtrl.close();

    this.nav.setRoot(WelcomePage).then(() =>{
        this.nav.popToRoot();
    });

    
    //this.nav.push(WelcomePage);
  }

  openTest1(){

    this.menuCtrl.close();

    localStorage.setItem('type_id',1);

    this.nav.setRoot(Test1Page).then(() =>{
        this.nav.popToRoot();
    });

  }

  openTest2(){

    this.menuCtrl.close();
    localStorage.setItem('type_id',2);

    this.nav.setRoot(Test1Page).then(() =>{
        this.nav.popToRoot();
    });

    
  }


}
