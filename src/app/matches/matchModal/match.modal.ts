import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {Category, Designation, Division, Match} from "../../models/Match";
import {Storage} from '@ionic/storage';
import {DB} from '../../models/Models';
import {Tournament} from "../../models/Tournament";

@Component({
    selector: 'modal-match',
    templateUrl: 'modal-match.html'
})
export class MatchModal implements OnInit{

    @Input() local: string;
    @Input() visit: string;
    @Input() division: string;
    @Input() designation: string;
    @Input() category: string;
    @Input() date: string = new Date().toISOString();
    @Input() tournament: Tournament;

    public tournaments :Tournament[] = [];
    public divisionList = Object.entries(Division);
    public designationList = Object.entries(Designation);
    public categoryList = Object.entries(Category);

    constructor(private storage: Storage, public modalController: ModalController,
                navParams: NavParams, private toastController: ToastController) {
        //this.storage.remove(MATCHES_KEY);
        //this.storage.set(ID_KEY, 0);
    }

    ngOnInit(): void {
        this.getTournaments();
    }

    async addMatch(): Promise<any> {
        this.modalController.dismiss().then();
        const toast = await this.toastController.create({
            message: 'El partido ha sido registrado.',
            duration: 2000
        });
        await toast.present();
        let matchId;
        this.storage.get(DB.ID_KEY).then((id: number) => {
            matchId = ++id;
            this.storage.set(DB.ID_KEY, matchId);
        });
        return this.storage.get(DB.MATCHES_KEY).then((matches: Match[]) => {
            const match: Match = {
                id: matchId,
                category: this.category,
                division: this.division,
                designation: this.designation,
                localTeam: this.local,
                visitTeam: this.visit,
                date: new Date(this.date),
                tournament: this.tournament
            };
            if (matches) {
                matches.push(match);
                return this.storage.set(DB.MATCHES_KEY, matches);
            } else {
                return this.storage.set(DB.MATCHES_KEY, [match]);
            }
        });
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