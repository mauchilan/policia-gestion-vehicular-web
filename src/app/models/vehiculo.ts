import { Catalogo } from "./catalogo";
import { Dependencia } from "./dependencia";

export class Vehiculo {
    idVehichulo?: number;
    idDependencia: string | undefined;
    placa: string | undefined;
    chasis: string | undefined;
    motor: string | undefined;
    kilometraje: number | undefined;
    cilindraje: string | undefined;
    capacidadCarga: number | undefined;
    capacidadPasajero: number | undefined;
    modelo?: Catalogo;
    tipoVehiculo?: Catalogo;
    marca?: Catalogo;
    dependencia?: Dependencia;
}
