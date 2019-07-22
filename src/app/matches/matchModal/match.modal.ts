import {Component, Input} from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {Category, Designation, Division, Match} from "../../models/Match";
import {Storage} from '@ionic/storage';
import {DB} from '../../models/Models';

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

    public divisionList = Object.entries(Division);
    public designationList = Object.entries(Designation);
    public categoryList = Object.entries(Category);

    constructor(private storage: Storage, public modalController: ModalController,
                navParams: NavParams, private toastController: ToastController) {
        //this.storage.remove(MATCHES_KEY);
        //this.storage.set(ID_KEY, 0);
    }

    async addMatch(): Promise<any> {
        this.modalController.dismiss().then();
        const toast = await this.toastController.create({
            message: 'El partido ha sido registrado.',
            duration: 2000
        });
        toast.present();
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
                date: new Date(this.date)
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
                //this.tournaments = tournaments;
            }
        });
    }
}