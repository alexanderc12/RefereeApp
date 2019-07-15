import {Component, OnInit, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {MatchModal} from '../matches/matchModal/match.modal';
import {Match} from "../models/Match";
import {Storage} from "@ionic/storage";

const MATCHES_KEY = 'matches';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html'
})
export class ProfilePage implements OnInit{

    @Input() matchCount: number;

    constructor(public modalController: ModalController, private storage: Storage) {}

    ngOnInit() {
        this.countMatches();
    }

    async showAddMatchDialog() {
        let modal = await this.modalController.create({
            component: MatchModal
        });
        modal.onDidDismiss().then( () => {
            this.countMatches();
        });
        return await modal.present();
    }

    countMatches(){
        this.getMatches().then(items =>{
            this.matchCount = items.length;
        });
    }

    getMatches(): Promise<Match[]>{
        return this.storage.get(MATCHES_KEY);
    }   
}