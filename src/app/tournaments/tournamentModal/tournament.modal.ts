import {Component, Input} from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Tournament} from "../../models/Tournament";
import {DB} from '../../models/Models';

@Component({
    selector: 'modal-tournament',
    templateUrl: 'tournament-modal.html'
})
export class TournamentModal {

    @Input() name: string;
    @Input() place: string;
    @Input() year: number;

    constructor(private storage: Storage, public modalController: ModalController,
                navParams: NavParams, private toastController: ToastController) {
        //this.storage.remove(TOURNAMENTS_KEY);
        //this.storage.set(TOURNAMENTS_KEY, 0);
    }

    async addTournament() {
        let tournamentId;
        this.storage.get(DB.TOURNAMENTS_ID_KEY).then((id: number) => {
            tournamentId = ++id;
            this.storage.set(DB.TOURNAMENTS_ID_KEY, tournamentId).catch((error) => console.log(error));
        });
        this.storage.get(DB.TOURNAMENTS_KEY).then((tournaments: Tournament[]) => {
            const tournament: Tournament = {
                id: tournamentId,
                name: this.name,
                place: this.place,
                year: this.year
            };
            if (tournaments) {
                tournaments.push(tournament);
                this.storage.set(DB.TOURNAMENTS_KEY, tournaments);
            } else {
                this.storage.set(DB.TOURNAMENTS_KEY, [tournament]);
            }
        });
        await this.modalController.dismiss();
        const toast = await this.toastController.create({
            message: 'El torneo ha sido registrado.',
            duration: 2000,
            color: "primary"
        });
        await toast.present();
    }
}