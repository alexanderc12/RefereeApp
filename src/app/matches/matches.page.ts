import {Component, Input, OnInit} from '@angular/core';
import {Designation, Division, Category, Match} from "../models/Match";
import { Storage } from '@ionic/storage';
import { saveAs } from 'file-saver';
import * as Excel from 'exceljs/dist/exceljs.js';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { File } from '@ionic-native/file/ngx';

const MATCHES_KEY = 'matches';

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html',
  providers: [EmailComposer, File]
})
export class MatchesPage {

  public matches :  Match[] = [];
  public division = Division;
  public designation = Designation;
  public category = Category;
  public startDate: string;
  public endDate: string;

  constructor(private storage: Storage, private emailComposer: EmailComposer, private file: File) {
    this.getMatches().then(matches =>{
      if(matches){
        this.matches = matches;
        this.matches.sort(function (item, nextItem) {
          return +item.date - +nextItem.date;
        });
        this.startDate = new Date(Math.min.apply(null, this.matches.map(match => new Date(match.date)))).toISOString();
        this.endDate = new Date(Math.max.apply(null, this.matches.map(match => new Date(match.date)))).toISOString();
      }
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
      { header: 'Equipo local', key: 'localTeam'},
      { header: 'Equipo visitante', key: 'visitTeam'}
    ];
    this.matches.forEach((match, index) => {
      sheet.addRow({id: match.id, date: match.date, designation: this.designation[match.designation],
            category: this.category[match.category], division: this.division[match.division],
        localTeam: match.localTeam, visitTeam: match.visitTeam}).commit();
    });

    workbook.xlsx.writeBuffer().then(buffer => saveAs(new Blob([buffer]), `${this.file.dataDirectory}reporte.xlsx`))
        .catch(err => console.log('Error writing excel export', err));

    let email = {
      to: 'alexanderb221@gmail.com',
      attachments: [
        `${this.file.dataDirectory}reporte.xlsx`
      ],
      subject: 'Reporte arbitral',
      body: `Buen día, adjunto el reporte de los partidos en el periodo comprendido desde el `
      + `${new Date(this.startDate).toLocaleDateString()} hasta el ${new Date(this.endDate).toLocaleDateString()}. ${this.file.dataDirectory}reporte.xlsx`,
      isHtml: true
    };

    this.emailComposer.open(email).catch(
        function (error) {
          console.log("Error:" + error);
        }
    );
  }
}