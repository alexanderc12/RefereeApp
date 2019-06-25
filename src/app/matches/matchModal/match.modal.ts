import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
    selector: 'modal-match',
    templateUrl: 'modal-match.html'
})
export class MatchModal {

    @Input() value: number;

    constructor(public modalController: ModalController, navParams: NavParams) {}
}