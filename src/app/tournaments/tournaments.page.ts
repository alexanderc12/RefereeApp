import {Component, OnInit} from '@angular/core';
import {Tournament} from "../models/Tournament";
import {ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {TournamentModal} from "./tournamentModal/tournament.modal";

const TOURNAMENTS_KEY = 'tournaments';

@Component({
    selector: 'tournaments',
    templateUrl: 'tournaments.page.html'
})
export class TournamentsPage implements OnInit{

    public tournaments :  Tournament[] = [];

    constructor(public modalController: ModalController, private storage: Storage) {}

    ngOnInit() {
        this.getTournaments().then(tournaments => {
            if(tournaments){
                this.tournaments = tournaments;
            }
        });
    }

    async showAddTournamentDialog(){
        let modal = await this.modalController.create({
            component: TournamentModal
        });
        return await modal.present();
    }

    getTournaments(): Promise<Tournament[]>{
        return this.storage.get(TOURNAMENTS_KEY);
    }
}