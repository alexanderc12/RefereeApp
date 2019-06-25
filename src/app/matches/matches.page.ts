import { Component, OnInit } from '@angular/core';
import { Match } from "../models/Match";
import { Storage } from '@ionic/storage';

const MATCHES_KEY = 'matches';

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html'
})
export class MatchesPage implements OnInit {
  public items :  Match[] = [];

  constructor(private storage: Storage) {
    this.getMatches().then(items =>{
      this.items = items;
    });
  }

  ngOnInit() {
  }

  getMatches(): Promise<Match[]>{
    return this.storage.get(MATCHES_KEY);
  }
}
