import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { TestPage } from '../../pages/test/test';

/**
 * Generated class for the Test2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test2',
  templateUrl: 'test2.html',
})
export class Test2Page {

  classes: string[];
  errorMessage: string;

  class_id: string;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private logger: RemoteServiceProvider) {}

  test() {
    this.navCtrl.setRoot(TestPage).then(() => {
      this.navCtrl.popToRoot();
    });
  }

}
