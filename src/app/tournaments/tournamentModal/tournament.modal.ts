import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NavParams} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';
import {Tournament} from "../../models/Tournament";

const TOURNAMENTS_KEY = 'tournaments';
const TOURNAMENTS_ID_KEY = 'id';

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
        //this.storage.remove(MATCHES_KEY);
        //this.storage.set(ID_KEY, 0);
    }

    async addTournament(): Promise<any> {
        this.modalController.dismiss().then();
        const toast = await this.toastController.create({
            message: 'El torneo ha sido registrado.',
            duration: 2000
        });
        toast.present();
        let tournamentId;
        this.storage.get(TOURNAMENTS_ID_KEY).then((id: number) => {
            tournamentId = ++id;
            this.storage.set(TOURNAMENTS_ID_KEY, tournamentId).catch((error) => console.log(error));
        });

        return this.storage.get(TOURNAMENTS_KEY).then((tournaments: Tournament[]) => {
            const tournament: Tournament = {
                id: tournamentId,
                name: this.name,
                place: this.place,
                year: this.year
            };
            if (tournaments) {
                tournaments.push(tournament);
                return this.storage.set(TOURNAMENTS_KEY, tournaments);
            } else {
                return this.storage.set(TOURNAMENTS_KEY, [tournament]);
            }
        });
    }
}