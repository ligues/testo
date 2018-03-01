import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { TabsPage } from '../../pages/tabs/tabs';
import { WelcomePage } from '../../pages/welcome/welcome';
import { LoginPage } from '../../pages/login/login';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})


export class RegisterPage {

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


  register(){


   let user = this.credentialsForm.controls.email.value;
   let password = this.credentialsForm.controls.password.value;

  var userPostData = {"user":user,"password":password};

	this.logger.postData('users/register',userPostData,'').then((result) => {

    	this.responseData = result;

    	if(this.responseData.error){
    		let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: this.responseData.error,
            buttons: ['Aceptar'] 
          });
          alert.present();
    	}
    	else{
    		let alert = this.alertCtrl.create({
            title: 'Registrarse',
            subTitle: 'El usuario se ha creado. Ingrese sus datos en la pantalla de acceso',
            buttons: [{
			    text: 'Aceptar',
			    handler: () => {

			      let navTransition = alert.dismiss();

		        	this.credentialsForm = this.formBuilder.group({
				      email: [''],
				      password: ['']
				    });

			        navTransition.then(() => {
			          this.navCtrl.push(LoginPage);
			        });
			      
			      return false;
			    }
			  }]
          });
          
          alert.present();





         


          

    	}
        
    }, 
    (err) => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err,
            buttons: ['Aceptar']
          });
          alert.present();
      		console.log(err)
    	});

  }

 

}
