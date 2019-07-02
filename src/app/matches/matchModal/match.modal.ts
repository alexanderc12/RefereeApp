import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { Match } from "../../models/Match";
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

const MATCHES_KEY = 'matches';

@Component({
    selector: 'modal-match',
    templateUrl: 'modal-match.html'
})
export class MatchModal {

    @Input() local: string;
    @Input() visit: string;
    @Input() division: string;
    @Input() designation: string;
    @Input() category: string;
    @Input() date: string = new Date().toISOString();

    constructor(private storage: Storage, public modalController: ModalController,
                navParams: NavParams, private toastController: ToastController) {}

    async addMatch(): Promise<any>{
        this.modalController.dismiss();

        const toast = await this.toastController.create({
            message: 'El partido ha sido registrado.',
            duration: 2000
        });
        toast.present();

        return this.storage.get(MATCHES_KEY).then((matches: Match[]) => {
            const match: Match = {
                id: 0,
                category: this.category,
                division: this.division,
                designation: this.designation,
                localTeam: this.local,
                visitTeam: this.visit,
                date: new Date(this.date)
            };
            if (matches) {
                match.id = matches.length;
                matches.push(match);
                return this.storage.set(MATCHES_KEY, matches);
            } else {
                return this.storage.set(MATCHES_KEY, [match]);
            }
        });
    }
}