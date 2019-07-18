import {Component, OnInit} from '@angular/core';
import {Designation, Division, Category, Match} from "../models/Match";
import { Storage } from '@ionic/storage';
import * as Excel from 'exceljs/dist/exceljs.js';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { File } from '@ionic-native/file/ngx';

const MATCHES_KEY = 'matches';

@Component({
  selector: 'app-matches',
  templateUrl: 'matches.page.html',
  providers: [EmailComposer, File]
})
export class MatchesPage implements OnInit{

  public matches :  Match[] = [];
  public division = Division;
  public designation = Designation;
  public category = Category;
  public startDate: string;
  public endDate: string;
  public minDate: string;
  public maxDate: string;
  public totalMatches: number;

  constructor(private storage: Storage, private emailComposer: EmailComposer, private file: File) {}

  ngOnInit(): void {
    this.getMatches().then(matches =>{
      if(matches){
        this.matches = matches;
        this.matches.sort(function (item, nextItem) {
          return +item.date - +nextItem.date;
        });
        this.totalMatches = matches.length;
        this.startDate = new Date(Math.min.apply(null, this.matches.map(match => new Date(match.date)))).toISOString();
        this.endDate = new Date(Math.max.apply(null, this.matches.map(match => new Date(match.date)))).toISOString();
      }else{
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
      }
      this.minDate = this.startDate;
      this.maxDate = this.endDate;
    });
  }

  getMatches(): Promise<Match[]>{
    return this.storage.get(MATCHES_KEY);
  }

  delete(deleteMatch) {
    this.getMatches().then((matches) => {
      if (matches){
        this.matches = matches.filter(match => match.id !== deleteMatch.id);
        this.storage.set(MATCHES_KEY, this.matches).catch(error => console.log(error));
        this.updateMatches();
      }
    });
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
    this.matches.forEach((match) => {
      sheet.addRow({id: match.id, date: match.date, designation: this.designation[match.designation],
            category: this.category[match.category], division: this.division[match.division],
        localTeam: match.localTeam, visitTeam: match.visitTeam}).commit();
    });
    let filePath = this.file.externalApplicationStorageDirectory;
    const FILE_NAME = 'reporte.xlsx';
    workbook.xlsx.writeBuffer().then(buffer => this.file.writeExistingFile(filePath, FILE_NAME, new Blob([buffer])));
    let email = {
      to: '',
      attachments: [
          filePath + FILE_NAME
      ],
      subject: 'Reporte arbitral',
      body: `Buen día, adjunto el reporte de los partidos en el periodo comprendido desde el `
      + `${new Date(this.startDate).toLocaleDateString()} hasta el ${new Date(this.endDate).toLocaleDateString()}.`,
      isHtml: true
    };

    this.emailComposer.open(email).catch(error => { console.log("Error:" + error); });
  }

  updateMatches(){
    this.getMatches().then((matches) => {
      if (matches) {
        this.matches = matches.filter(match =>
            new Date(match.date).setHours(0,0,0,0)
            >= new Date(this.startDate).setHours(0,0,0,0)
            && new Date(match.date).setHours(0,0,0,0)
            <= new Date(this.endDate).setHours(0,0,0,0));
        this.matches.sort(function (item, nextItem) {
          return +item.date - +nextItem.date;
        });
      }
    });
  }
}