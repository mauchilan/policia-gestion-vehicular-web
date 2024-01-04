import { Localidad } from "./localidad";

export class Dependencia {
    idDependencia?: string;
    nombreDependencia?: string;
    tipoDependencia?: string;
    numeroDependencia?: number;
    parentDependencia?: number;
    localidad?: Localidad;
}
