import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {TournamentsPage} from './tournaments.page';
import {TournamentModal} from './tournamentModal/tournament.modal';
import {TournamentDetails} from './tournamentDetails/tournamentDetails';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: TournamentsPage
            }
        ])
    ],
    declarations: [TournamentsPage, TournamentModal,TournamentDetails],
    entryComponents: [TournamentsPage, TournamentModal, TournamentDetails]
})
export class TournamentsPageModule {
}
