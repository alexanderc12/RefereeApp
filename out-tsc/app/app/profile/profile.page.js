import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MatchModal } from '../matches/matchModal/match.modal';
import { ModalController } from '@ionic/angular';
var MATCHES_KEY = 'matches';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(storage, modalController) {
        this.storage = storage;
        this.modalController = modalController;
    }
    ProfilePage.prototype.showAddMatchDialog = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: MatchModal,
                            componentProps: {
                                'prop1': 1,
                                'prop2': 2
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfilePage.prototype.addMatch = function (match) {
        var _this = this;
        return this.storage.get(MATCHES_KEY).then(function (matches) {
            if (matches) {
                matches.push(match);
                return _this.storage.set(MATCHES_KEY, matches);
            }
            else {
                return _this.storage.set(MATCHES_KEY, [match]);
            }
        });
    };
    ProfilePage.prototype.getMatches = function () {
        return this.storage.get(MATCHES_KEY);
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: 'profile.page.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, ModalController])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map