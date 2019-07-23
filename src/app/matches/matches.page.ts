import {Component, OnInit} from '@angular/core';
import {Category, Designation, Division, Match} from "../models/Match";
import {Storage} from '@ionic/storage';
import * as Excel from 'exceljs/dist/exceljs.js';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {File} from '@ionic-native/file/ngx';
import {DB} from '../models/Models';
import {Tournament} from "../models/Tournament";
import {ToastController} from "@ionic/angular";

@Component({
    selector: 'app-matches',
    templateUrl: 'matches.page.html',
    providers: [EmailComposer, File]
})
export class MatchesPage implements OnInit {

    public matches: Match[] = [];
    public tournaments: Tournament[] = [];

    public division = Division;
    public designation = Designation;
    public category = Category;
    public startDate: string;
    public endDate: string;
    public minDate: string;
    public maxDate: string;
    public totalMatches: number;

    constructor(private storage: Storage, private emailComposer: EmailComposer, private file: File,
                private toastController: ToastController) {
    }

    async ngOnInit() {
        await this.getTournaments();
        await this.getMatches();
    }

    getTournaments() {
        this.storage.get(DB.TOURNAMENTS_KEY).then(tournaments => {
            if (tournaments) {
                this.tournaments = tournaments;
            }
        });
    }

    getMatches() {
        this.storage.get(DB.MATCHES_KEY).then(matches => {
            if (matches) {
                this.matches = matches;
                this.matches.sort(function (item, nextItem) {
                    return +item.date - +nextItem.date;
                });
                this.totalMatches = matches.length;
                this.startDate = new Date(Math.min.apply(null, this.matches.map(match => new Date(match.date)))).toISOString();
                this.endDate = new Date(Math.max.apply(null, this.matches.map(match => new Date(match.date)))).toISOString();
            } else {
                this.startDate = new Date().toISOString();
                this.endDate = new Date().toISOString();
            }
            this.minDate = this.startDate;
            this.maxDate = this.endDate;
        });
    }

    delete(deleteMatch) {
        this.storage.get(DB.MATCHES_KEY).then((matches) => {
            if (matches) {
                this.matches = matches.filter(match => match.id !== deleteMatch.id);
                this.storage.set(DB.MATCHES_KEY, this.matches).catch(error => console.log(error));
                this.updateMatches();
            }
        });
    }

    export() {
        let workbook = new Excel.Workbook();
        let sheet = workbook.addWorksheet('Mis partidos');
        sheet.columns = [
            {header: 'Id', key: 'id'},
            {header: 'Fecha', key: 'date'},
            {header: 'Torneo', key: 'tournament'},
            {header: 'Designación', key: 'designation'},
            {header: 'Categoria', key: 'category'},
            {header: 'Rama', key: 'division'},
            {header: 'Equipo local', key: 'localTeam'},
            {header: 'Equipo visitante', key: 'visitTeam'}
        ];
        this.matches.forEach((match) => {
            sheet.addRow({
                id: match.id, date: new Date(match.date).toLocaleDateString(), tournament: this.getTournamentFrom(match),  designation: this.designation[match.designation],
                category: this.category[match.category], division: this.division[match.division],
                localTeam: match.localTeam, visitTeam: match.visitTeam
            }).commit();
        });

        let sheetStats = workbook.addWorksheet('Mis Estadisticas');
        sheetStats.columns = [
            {header: 'Reporte', key: 'report'},
            {header: 'Mayores', key: 'senior'},
            {header: 'Universitarios', key: 'univerisity'},
            {header: 'Juvenil', key: 'juvenile'},
            {header: 'Menores', key: 'miniors'},
            {header: 'Infantil', key: 'childish'},
            {header: 'Escolar', key: 'scholar'},
            {header: 'Total', key: 'total'},
        ];
        let stats:String [] = [Designation.FIRST_REFEREE];
        Object.keys(Category).forEach((column)=>{stats.push(this.countMatches(column, Designation.FIRST_REFEREE))});
        stats.push(String(this.matches.filter((match)=> {return match.designation === Designation.FIRST_REFEREE})));
        sheetStats.addRow(stats).commit();
        stats = [Designation.SECOND_REFEREE];
        Object.keys(Category).forEach((column)=>{stats.push(this.countMatches(column, Designation.SECOND_REFEREE))});
        stats.push(String(this.matches.filter((match)=> {return match.designation === Designation.SECOND_REFEREE})));
        sheetStats.addRow(stats).commit();
        stats = ['Total por categoria'];
        ['B','C','D','E','F','G'].forEach((column)=>{stats.push(sheetStats.getCell(column+'2') + sheetStats.getCell(column+'3'))});
        sheetStats.addRow(stats).commit();
        stats = ['Total', String(this.matches.length)];

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

        this.emailComposer.open(email).then(async ()=>{
            const toast = await this.toastController.create({
                message: 'El informe ha sido enviado con exito.',
                duration: 2000,
                color: "primary"
            });
            await toast.present();
        }).catch(async error => {
            console.log(error);
            const toast = await this.toastController.create({
                message: 'No hemos podido enviar tu reporte, intentalo más tarde.',
                duration: 2000,
                color: "primary"
            });
            await toast.present();
        });
    }

    updateMatches() {
        this.storage.get(DB.MATCHES_KEY).then((matches) => {
            if (matches) {
                this.matches = matches.filter(match =>
                    new Date(match.date).setHours(0, 0, 0, 0)
                    >= new Date(this.startDate).setHours(0, 0, 0, 0)
                    && new Date(match.date).setHours(0, 0, 0, 0)
                    <= new Date(this.endDate).setHours(0, 0, 0, 0));
                this.matches.sort(function (item, nextItem) {
                    return +item.date - +nextItem.date;
                });
            }
        });
    }

    getTournamentFrom(match){
     let tournamentResult = this.tournaments.find((tournament) => {return tournament.id === match.tournament});
     if(tournamentResult === undefined){
         return 'No registra';
     }
     return tournamentResult.name;
    }
    countMatches(category, designation){
        return String(this.matches.filter((match)=>{return match.category === category && this.designation[match.designation] === designation;}).length);
    }
}