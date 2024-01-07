import { Component, OnInit } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Localidad } from "../../../models/localidad";
import { LocalidadService } from "../../../services/app/localidad.service";
import { DependenciaService } from "../../../services/app/dependencia.service";
import { Dependencia } from "../../../models/dependencia";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    template: ''
})
export class CircuitoBase implements OnInit {

    provincias: Localidad[] = [];
    cantones: Localidad[] = [];
    distritos: Dependencia[] = []
    circuitoForm!: UntypedFormGroup;

    constructor(public formBuilder: UntypedFormBuilder, 
                public router: Router,
                public localidadService: LocalidadService,
                public dependenciaService: DependenciaService,
                public confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.localidadService.obtenerProvincias().subscribe(response => {
            this.provincias = response;
        });
    }

    createForm() {
        this.circuitoForm = this.formBuilder.group({
            idProvincia: new FormControl("", [Validators.required]),
            idParentDependencia: new FormControl("", [Validators.required]),
            idLocalidad: new FormControl("", [Validators.required]),
            idDependencia: new FormControl("", [Validators.required]),
            nombreDependencia: new FormControl("", [Validators.required]),
        });
    }

    obtenerDependencias() {
        this.obtenerCantones();
        this.obtenerDistritos();
    }

    obtenerCantones() {
        this.cantones = [];
        this.localidadService.obtenerLocalidad(this.model["idProvincia"].value).subscribe(response => {
            this.cantones = response;
        });
    }

    obtenerDistritos() {
        const localidad = new Localidad;
        localidad.idLocalidad = this.model["idProvincia"].value;
        this.dependenciaService.obtenerDependenciaLocalidad(localidad).subscribe(response => {
            this.distritos = response;
        })
    }

    get model() {
        return this.circuitoForm.controls;
    }

}
