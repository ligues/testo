import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { TabsPage } from '../../pages/tabs/tabs';
import { WelcomePage } from '../../pages/welcome/welcome';
import { RegisterPage } from '../../pages/register/register';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {

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

	this.logger.postData('users/login',userPostData).then((result) => {

      this.responseData = result;

        
        const school_id = localStorage.getItem('school_id');

      	if(this.responseData.token){

          if(school_id){
            this.navCtrl.setRoot(TabsPage).then(() =>{
              localStorage.setItem('userData', JSON.stringify(this.responseData));
              this.navCtrl.popToRoot();
            });
          }
          else{
            this.navCtrl.setRoot(WelcomePage).then(() =>{
              localStorage.setItem('userData', JSON.stringify(this.responseData));
              this.navCtrl.popToRoot();
            });
          }
      	}
      	else{ 
      		console.log("User already exists"); 
      	}
    	}, (err) => {
      		console.log(err)
    	});

  }

  onRegister() {
    this.navCtrl.push(RegisterPage);
  }



}
