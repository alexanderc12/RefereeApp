import { Component, OnInit } from '@angular/core';
import {Designation, Division, Category, Match} from "../models/Match";
import { Storage } from '@ionic/storage';

const MATCHES_KEY = 'matches';

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html'
})
export class MatchesPage implements OnInit {
  public items :  Match[] = [];
  public division = Division;
  public designation = Designation;
  public category = Category;

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
