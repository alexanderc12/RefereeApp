import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
var MATCHES_KEY = 'matches';
var MatchesPage = /** @class */ (function () {
    function MatchesPage(storage) {
        var _this = this;
        this.storage = storage;
        this.items = [];
        this.getMatches().then(function (items) {
            _this.items = items;
        });
    }
    MatchesPage.prototype.ngOnInit = function () {
    };
    MatchesPage.prototype.getMatches = function () {
        return this.storage.get(MATCHES_KEY);
    };
    MatchesPage = tslib_1.__decorate([
        Component({
            selector: 'app-matches',
            templateUrl: 'matches.page.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], MatchesPage);
    return MatchesPage;
}());
export { MatchesPage };
//# sourceMappingURL=matches.page.js.map