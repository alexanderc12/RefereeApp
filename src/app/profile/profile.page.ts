import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MatchModal } from '../matches/matchModal/match.modal';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html'
})
export class ProfilePage {

  constructor(public modalController: ModalController) {}

  async showAddMatchDialog(){
    const modal = await this.modalController.create({
      component: MatchModal,
      componentProps: {
        'prop1': 1,
        'prop2': 2
      }
    });
    return await modal.present();
  }
}