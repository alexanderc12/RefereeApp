import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Match} from '../models/Match';
import { MatchModal } from '../matches/matchModal/match.modal';
import { ModalController } from '@ionic/angular';

const MATCHES_KEY = 'matches';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html'
})
export class ProfilePage {

  constructor(private storage: Storage, public modalController: ModalController) {}

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

  addMatch(match: Match): Promise<any>{
    return this.storage.get(MATCHES_KEY).then((matches: Match[]) => {
      if (matches) {
        matches.push(match);
        return this.storage.set(MATCHES_KEY, matches);
      } else {
        return this.storage.set(MATCHES_KEY, [match]);
      }
    });
  }

  getMatches(): Promise<Match[]>{
    return this.storage.get(MATCHES_KEY);
  }
}