export class Mantenimiento {
    idMantenimiento?: number;
    idPersonal?: string;
    idVehichulo?: number;
    idTipoMantemiento?: number;
    kmActual?: number;
    observaciones?: string;
    fechaMantenimiento?: Date;
    horaMantenimiento?: Date;
    proximoKilometraje?: number;
    usuarioEntrega?: string;
    usuarioRetira?: string;
    subCosto?: number;
    iva?: number;
    costoTotal?: number;
    estado?: string;
}
