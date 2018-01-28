import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp { 


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      
      const token = localStorage.getItem('userData');
      const school_id = localStorage.getItem('school_id');

      if (token  &&  school_id) { 
        this.rootPage = TabsPage; 
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
}
