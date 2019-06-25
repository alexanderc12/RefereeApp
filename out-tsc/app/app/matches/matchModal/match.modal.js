import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
var MatchModal = /** @class */ (function () {
    function MatchModal(modalController, navParams) {
        this.modalController = modalController;
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], MatchModal.prototype, "value", void 0);
    MatchModal = tslib_1.__decorate([
        Component({
            selector: 'modal-match',
            templateUrl: 'modal-match.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, NavParams])
    ], MatchModal);
    return MatchModal;
}());
export { MatchModal };
//# sourceMappingURL=match.modal.js.map