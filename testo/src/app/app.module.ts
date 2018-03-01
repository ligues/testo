import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
//import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SchoolPage } from '../pages/school/school';
import { WelcomePage } from '../pages/welcome/welcome';
import { Test1Page } from '../pages/test1/test1';
import { Test2Page } from '../pages/test2/test2';
import { Test3Page } from '../pages/test3/test3';
import { TestPage } from '../pages/test/test';
import { ResultPage } from '../pages/result/result';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
//    TabsPage,
    LoginPage,
    RegisterPage,
    SchoolPage,
    WelcomePage,
    Test1Page,
    Test2Page,
    Test3Page,
    TestPage,
    ResultPage
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],  
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
//    TabsPage,
    LoginPage,
    RegisterPage,
    SchoolPage,
    WelcomePage,
    Test1Page,
    Test2Page,
    Test3Page,
    TestPage,
    ResultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider
  ]
})
export class AppModule {}
