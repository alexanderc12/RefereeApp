import * as tslib_1 from "tslib";
import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

var MATCHES_KEY = 'matches';
var MatchModal = /** @class */ (function () {
    function MatchModal(storage, modalController) {
        this.storage = storage;
        this.modalController = modalController;
    }

    MatchModal.prototype.addMatch = function () {
        var _this = this;
        return this.storage.get(MATCHES_KEY).then(function (matches) {
            var match = {
                id: 0,
                division: '',
                designation: '',
                localTeam: '',
                visitTeam: '',
                date: new Date(Date.now())
            };
            if (matches) {
                matches.push(match);
                return _this.storage.set(MATCHES_KEY, matches);
            } else {
                return _this.storage.set(MATCHES_KEY, [match]);
            }
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], MatchModal.prototype, "value", void 0);
    MatchModal = tslib_1.__decorate([
        Component({
            selector: 'modal-match',
            templateUrl: 'modal-match.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, ModalController, NavParams])
    ], MatchModal);
    return MatchModal;
}());
export {MatchModal};
//# sourceMappingURL=match.modal.js.map