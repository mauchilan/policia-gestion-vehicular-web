import { MantenimientoTipoMantenimiento } from "./mantenimiento.tipo.mantenimiento";

export class MantenimientoDto {
    idMantenimiento?: number;
    idSolicitante?: number;
    solicitante?: string;
    fechaMantenimiento?: Date;
    horaMantenimiento?: Date;
    vehiculo?: number;
    mantenimientoTipoMantenimientos?: MantenimientoTipoMantenimiento[];
    subtotal?: number;
    iva?: number;
    total?: number;
}

