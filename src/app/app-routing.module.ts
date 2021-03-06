import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfilePageModule'
    },
    {
        path: 'tournaments',
        loadChildren: './tournaments/tournaments.module#TournamentsPageModule'
    },
    {
        path: 'matches',
        loadChildren: './matches/matches.module#MatchesPageModule'
    },
    {
        path: 'options',
        loadChildren: './options/options.module#OptionsPageModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
