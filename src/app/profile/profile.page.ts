import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html'
})
export class ProfilePage {

  constructor(private storage: Storage) {}

  addMatch(){
    this.storage.set('name', 'Max');

    // Or to get a key/value pair
    this.storage.get('age').then((val) => {
      console.log('Your age is', val);
    });
  }
}
