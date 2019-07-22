import {Component, Input} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Category, Designation, Division, Match} from "../../models/Match";
import {Tournament} from "../../models/Tournament";

@Component({
    selector: 'details-tournament',
    templateUrl: 'tournament-details.html'
})
export class TournamentDetails {

    @Input() tournament: Tournament;
    @Input() matches: Match[] = [];

    public division = Division;
    public designation = Designation;
    public category = Category;

    constructor(public modalController: ModalController) {
    }

    close(){
        this.modalController.dismiss();
    }
}