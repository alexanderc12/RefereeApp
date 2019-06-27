import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { Match } from "../../models/Match";
import { Storage } from '@ionic/storage';

const MATCHES_KEY = 'matches';

@Component({
    selector: 'modal-match',
    templateUrl: 'modal-match.html'
})
export class MatchModal {

    @Input() local: string;
    @Input() visit: string;
    @Input() designation: string;

    constructor(private storage: Storage, public modalController: ModalController, navParams: NavParams) {}

    addMatch(): Promise<any>{
        this.modalController.dismiss();
        return this.storage.get(MATCHES_KEY).then((matches: Match[]) => {
            const match: Match = {
                id: 0,
                division: '',
                designation: this.designation,
                localTeam: this.local,
                visitTeam: this.visit,
                date: new Date(Date.now())
            };
            if (matches) {
                matches.push(match);
                return this.storage.set(MATCHES_KEY, matches);
            } else {
                return this.storage.set(MATCHES_KEY, [match]);
            }
        });
    }
}