import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Perfil',
            url: '/profile',
            icon: 'person'
        },
        {
            title: 'Torneos',
            url: '/tournaments',
            icon: 'trophy'
        },
        {
            title: 'Partidos',
            url: '/matches',
            icon: 'list'
        },
        {
            title: 'Acerca de',
            url: '/options',
            icon: 'information-circle-outline'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
