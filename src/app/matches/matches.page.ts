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
export class MatchesPage implements OnInit {

  public items :  Match[] = [];
  public division = Division;
  public designation = Designation;
  public category = Category;
  @Input() startDate: string;
  @Input() endDate: string;

  constructor(private storage: Storage, private emailComposer: EmailComposer, private file: File) {}

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
    console.log('export');
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
      sheet.addRow({id:data.id, date: data.date, designation: this.designation[data.designation],
            category: this.category[data.category], division: this.division[data.division],
        localTeam: data.localTeam, visitTeam: data.visitTeam}).commit();
    });

    workbook.xlsx.writeBuffer(this.file.dataDirectory + '/reporte.xlsx').then(buffer => saveAs(new Blob([buffer]), `reporte.xlsx`))
        .catch(err => console.log('Error writing excel export', err));

    let email = {
      to: 'alexanderb221@gmail.com',
      attachments: [
        `${this.file.dataDirectory}/reporte.xlsx`
      ],
      subject: 'Reporte arbitral',
      body: `Buen día, adjunto el reporte de los partidos en el periodo comprendido desde el `
      + `${new Date(this.startDate).toLocaleDateString()} hasta el ${new Date(this.endDate).toLocaleDateString()}. ${this.file.dataDirectory}/reporte.xlsx`,
      isHtml: true
    };

    this.emailComposer.open(email).catch(
        function (error) {
          console.log("Error:" + error);
        }
    );
  }
}