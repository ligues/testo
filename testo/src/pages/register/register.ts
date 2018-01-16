import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoggerService } from '../../services/log4ts/logger.service';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { TabsPage } from '../../pages/tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})


export class RegisterPage {

	credentialsForm: FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private logger: RemoteServiceProvider) {

  	this.credentialsForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }


  onSignIn(){

  	var userPostData = {"user":"carlos@ligues.com.mx","password":".March806"};

	this.logger.postData(userPostData,'users/login').then((result) => {

      this.responseData = result;

      console.log(result);

      	if(this.responseData.token){
      		localStorage.setItem('userData', JSON.stringify(this.responseData));
      		this.navCtrl.push(TabsPage);
      	}
      	else{ 
      		console.log("User already exists"); 
      	}
    	}, (err) => {
      		console.log(err)
    	});

  }

  onForgotPassword() {
    this.logger.postData('SignInPage: onForgotPassword()');
  }



}
