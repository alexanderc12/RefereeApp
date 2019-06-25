module Designation {
    export const FIRST = "Primer arbitro";
    export const SECOND = "Segundo arbitro";
}

module Division {
    export const MEN = "Masculino";
    export const WOMAN = "Femenino";
}

export interface Match{
    id: number
    division: string,
    designation: string
    localTeam: string,
    visitTeam: string,
    date: Date
}