export enum Designation {
    FIRST_REFEREE = "Primer arbitro",
    SECOND_REFEREE = "Segundo arbitro"
}

export enum Division {
    MEN = "Masculino",
    WOMAN = "Femenino"
}

export interface Match{
    id: number
    category: string,
    division: string,
    designation: string
    localTeam: string,
    visitTeam: string,
    date: Date
}