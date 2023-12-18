import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from "@angular/forms";
import { CatalogoService } from '../../../services/app/catalogo.service';
import { Catalogo } from '../../../models/catalogo';

@Component({
  selector: 'app-vehiculos-nuevo',
  templateUrl: './vehiculos-nuevo.component.html'
})
export class VehiculosNuevoComponent {

  vehiculoForm!: UntypedFormGroup;
  catalogo: Catalogo = {};
  marcas?: Catalogo[] = [];
  tipoVehiculos: any = [];

  constructor(public formBuilder: UntypedFormBuilder,
    public catalogoService: CatalogoService) {
  }

  ngOnInit(): void {
    this.vehiculoForm = this.formBuilder.group({
      tipoVehiculo: new FormControl("", [Validators.required]),
      placa: new FormControl("", [Validators.required]),
      chasis: new FormControl("", [Validators.required]),
      marca: new FormControl("", [Validators.required]),
      modelo: new FormControl("", [Validators.required]),
      motor: new FormControl("", [Validators.required]),
      kilometraje: new FormControl("", [Validators.required]),
      cilindraje: new FormControl("", [Validators.required]),
      capacidadCarga: new FormControl("", [Validators.required]),
      capacidadPasajero: new FormControl("", [Validators.required]),
    });
    this.obtenerCatalogo('Tipo Vehiculo');
  }

  obtenerCatalogo(tipo: string) {
    this.catalogoService.obtenerCatalogo(tipo, 'A').subscribe(response => {
      this.catalogo = response;
      response.childs?.forEach(child => {
        this.tipoVehiculos.push({"name": child.descripcion, "code": child.idCatalogo})
      })
    });
  }

  obtenerMarcas() {
      this.marcas = this.catalogo.childs?.filter(marca => marca.catIdCatalogo == this.vehiculoForm.controls['tipoVehiculo'].value);
  }

  guardarVehiculo() {
    this.vehiculoForm.markAllAsTouched();
    this.vehiculoForm.updateValueAndValidity();
    if(!this.vehiculoForm.valid) {
    }
  }



}
