import {Tournament} from "./Tournament";

export enum Designation {
    FIRST_REFEREE = "Primer arbitro",
    SECOND_REFEREE = "Segundo arbitro"
}

export enum Division {
    MEN = "Masculino",
    WOMAN = "Femenino"
}

export enum Category {
    SENIOR = "Mayores",
    UNIVERSITY = "Universitarios",
    JUVENILE = "Juvenil",
    MINORS = "Menores",
    CHILDISH = "Infantil",
    SCHOLAR = "Escolar"
}

export interface Match {
    id: number
    category: string,
    division: string,
    designation: string
    localTeam: string,
    visitTeam: string,
    date: Date,
    tournament: number
}