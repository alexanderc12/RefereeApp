import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {Category, Designation, Division, Match} from "../../models/Match";
import {Storage} from '@ionic/storage';
import {DB} from '../../models/Models';
import {Tournament} from "../../models/Tournament";

@Component({
    selector: 'modal-match',
    templateUrl: 'modal-match.html'
})
export class MatchModal implements OnInit{

    public local: string;
    public visit: string;
    public division: string;
    public designation: string;
    public category: string;
    public date: string = new Date().toISOString();
    public tournament: number;

    public tournaments :Tournament[] = [];
    public divisionList = Object.entries(Division);
    public designationList = Object.entries(Designation);
    public categoryList = Object.entries(Category);

    constructor(private storage: Storage, public modalController: ModalController,
                private toastController: ToastController) {
        this.storage.remove(DB.MATCHES_KEY);
        this.storage.set(DB.ID_KEY, 0);
    }

    ngOnInit(): void {
        this.getTournaments();
    }

    async addMatch() {
        let matchId;
        this.storage.get(DB.ID_KEY).then((id: number) => {
            matchId = ++id;
            this.storage.set(DB.ID_KEY, matchId);
        });
        this.storage.get(DB.MATCHES_KEY).then((matches: Match[]) => {
            const match: Match = {
                id: matchId,
                category: this.category,
                division: this.division,
                designation: this.designation,
                localTeam: this.local,
                visitTeam: this.visit,
                date: new Date(this.date),
                tournament: +this.tournament
            };
            if (matches) {
                matches.push(match);
                return this.storage.set(DB.MATCHES_KEY, matches);
            } else {
                return this.storage.set(DB.MATCHES_KEY, [match]);
            }
        });
        await this.modalController.dismiss();
        const toast = await this.toastController.create({
            message: 'El partido ha sido registrado.',
            duration: 2000
        });
        await toast.present();
    }

    getTournaments() {
        this.storage.get(DB.TOURNAMENTS_KEY).then(tournaments => {
            if (tournaments) {
                this.tournaments = tournaments;
            }
        });
    }

    compareWith = (t1, t2) => {
        return t1 && t2 ? t1.id === t2.id : t1 === t2;
    };
}