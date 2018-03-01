import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { HomePage } from '../../pages/home/home';
import { WelcomePage } from '../../pages/welcome/welcome';
import { RegisterPage } from '../../pages/register/register';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {

	credentialsForm: FormGroup;


  responseData: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private logger: RemoteServiceProvider,
              private alertCtrl: AlertController) {

  	this.credentialsForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }


  onSignIn(){


   let user = this.credentialsForm.controls.email.value;
   let password = this.credentialsForm.controls.password.value;

  var userPostData = {"user":user,"password":password};

	this.logger.postData('users/login',userPostData,'').then((result) => {

      this.responseData = result;

        
        const school_id = localStorage.getItem('school_id');

      	if(this.responseData.token){

          if(school_id){
            this.navCtrl.setRoot(HomePage).then(() =>{
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
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Usuario / Password incorrectos.',
            buttons: ['Aceptar']
          });
          alert.present();

      	}
    	}, (err) => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err,
            buttons: ['Aceptar']
          });
          alert.present();
      		console.log(err)
    	});

  }

  onRegister() {
    this.navCtrl.push(RegisterPage);
  }



}
