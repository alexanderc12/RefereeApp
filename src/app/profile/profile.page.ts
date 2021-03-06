import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {MatchModal} from '../matches/matchModal/match.modal';
import {Designation, Match} from "../models/Match";
import {Storage} from "@ionic/storage";
import {DB} from '../models/Models';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html'
})
export class ProfilePage implements OnInit {

    public matchCount: number;
    public firstMatchCount: number;
    public secondMatchCount: number;
    public designation = Designation;

    constructor(public modalController: ModalController, private storage: Storage) {
    }

    ngOnInit() {
        this.countMatches();
    }

    async showAddMatchDialog() {
        let modal = await this.modalController.create({
            component: MatchModal
        });
        modal.onDidDismiss().then(() => {
            this.countMatches();
        });
        return await modal.present();
    }

    countMatches() {
        this.getMatches().then(matches => {
            if (matches) {
                this.matchCount = matches.length;
                this.firstMatchCount = matches.filter(
                    match => this.designation[match.designation] === Designation.FIRST_REFEREE).length;
                this.secondMatchCount = matches.filter(
                    match => this.designation[match.designation] === Designation.SECOND_REFEREE).length;
            } else {
                this.matchCount = 0;
                this.firstMatchCount = 0;
                this.secondMatchCount = 0;
            }
        });
    }

    getMatches(): Promise<Match[]> {
        return this.storage.get(DB.MATCHES_KEY);
    }
}