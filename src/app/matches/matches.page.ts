import { Component, OnInit } from '@angular/core';
import {Designation, Division, Category, Match} from "../models/Match";
import { Storage } from '@ionic/storage';
import * as Excel from 'exceljs/lib/exceljs.browser.js';

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
  public startDate: string;
  public endDate: string;

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.getMatches().then(items =>{
      this.items = items;
      this.items.sort(function (item, nextItem) {
        return +item.date - +nextItem.date;
      });
      this.startDate = new Date(Math.min.apply(Math, this.items.map(function(item) { return item.date; }))).toISOString();
      this.endDate = new Date(Math.max.apply(Math, this.items.map(function(item) { return item.date; }))).toISOString();
    });
  }

  getMatches(): Promise<Match[]>{
    return this.storage.get(MATCHES_KEY);
  }

  export(){
    let workbook = new Excel.Workbook();
    let sheet = workbook.addWorksheet('Mis partidos');
    sheet.columns = [
      { header: 'Id', key: 'id'},
      { header: 'Fecha', key: 'date'},
      { header: 'Designación', key: 'designation'},
      { header: 'Categoria', key: 'category'},
      { header: 'Rama', key: 'division'},
      { header: 'Equipo', key: 'localTeam'},
      { header: 'Equipo', key: 'visitTeam'},

    ];
    this.items.forEach((data, index) => {
      sheet.addRow({...data}).commit();
    });
    sheet.commit();
    workbook.xlsx.writeFile('reporte.xlsx');
  }
}
