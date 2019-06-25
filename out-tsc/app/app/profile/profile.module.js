import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ProfilePage } from './profile.page';
import { MatchModal } from '../matches/matchModal/match.modal';
var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild([
                    {
                        path: '',
                        component: ProfilePage
                    }
                ])
            ],
            declarations: [ProfilePage, MatchModal]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());
export { ProfilePageModule };
//# sourceMappingURL=profile.module.js.map