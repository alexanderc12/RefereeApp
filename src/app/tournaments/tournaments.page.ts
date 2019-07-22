import {Component, OnInit} from '@angular/core';
import {Tournament} from "../models/Tournament";
import {ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {TournamentModal} from "./tournamentModal/tournament.modal";
import {DB} from '../models/Models';

@Component({
    selector: 'tournaments',
    templateUrl: 'tournaments.page.html'
})
export class TournamentsPage implements OnInit {

    public tournaments: Tournament[] = [];

    constructor(public modalController: ModalController, private storage: Storage) {
    }

    ngOnInit() {
        this.getTournaments();
    }

    async showAddTournamentDialog() {
        let modal = await this.modalController.create({
            component: TournamentModal
        });
        modal.onDidDismiss().then(() => {
                setTimeout(() => this.getTournaments(), 300);
            }
        );
        return await modal.present();
    }

    getTournaments() {
        this.storage.get(DB.TOURNAMENTS_KEY).then(tournaments => {
            if (tournaments) {
                this.tournaments = tournaments;
            }
        });
    }
}