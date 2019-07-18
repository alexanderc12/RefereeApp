import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatchesPage } from './matches.page';
var MatchesPageModule = /** @class */ (function () {
    function MatchesPageModule() {
    }
    MatchesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild([
                    {
                        path: '',
                        component: MatchesPage
                    }
                ])
            ],
            declarations: [MatchesPage]
        })
    ], MatchesPageModule);
    return MatchesPageModule;
}());
export { MatchesPageModule };
//# sourceMappingURL=matches.module.js.map