import { Localidad } from "./localidad";

export class Dependencia {
    idDependencia?: string;
    nombreDependencia?: string;
    tipoDependencia?: string;
    numeroDependencia?: number;
    parentDependencia?: string;
    localidad?: Localidad;
    dependencia?: Dependencia;
}
