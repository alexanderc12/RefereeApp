import {Component, OnInit} from '@angular/core';
import {Tournament} from "../models/Tournament";
import {ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {TournamentModal} from "./tournamentModal/tournament.modal";
import {DB} from '../models/Models';
import {TournamentDetails} from "./tournamentDetails/tournamentDetails";

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
                this.getTournaments();
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

    async showDetails(tournament){
        let matchesOfTournament = [];
        await this.storage.get(DB.MATCHES_KEY).then(matches => {
            if (matches) {
                matchesOfTournament = matches.filter((match) => {return match.tournament === tournament.id});
            }
        });
        let modal = await this.modalController.create({
            component: TournamentDetails,
            componentProps: {'tournament': tournament, 'matches': matchesOfTournament}
        });
        return await modal.present();
    }
}