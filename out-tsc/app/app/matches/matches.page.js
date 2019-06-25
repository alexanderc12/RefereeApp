import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var MatchesPage = /** @class */ (function () {
    function MatchesPage() {
        this.icons = [
            'flask',
            'wifi',
            'beer',
            'football',
            'basketball',
            'paper-plane',
            'american-football',
            'boat',
            'bluetooth',
            'build'
        ];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    MatchesPage.prototype.ngOnInit = function () {
    };
    MatchesPage = tslib_1.__decorate([
        Component({
            selector: 'app-matches',
            templateUrl: 'matches.page.html'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MatchesPage);
    return MatchesPage;
}());
export { MatchesPage };
//# sourceMappingURL=matches.page.js.map