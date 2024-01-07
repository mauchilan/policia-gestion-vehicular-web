import { Component, OnInit } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LocalidadService } from "../../../services/app/localidad.service";
import { DependenciaService } from "../../../services/app/dependencia.service";
import { ConfirmationService } from "primeng/api";
import { Localidad } from "../../../models/localidad";
import { Dependencia } from "../../../models/dependencia";

@Component({
    template: ''
})
export class SubcircuitoBase implements OnInit {

    provincias: Localidad[] = [];
    cantones: Localidad[] = [];
    parroquias: Localidad[] = [];
    distritos: Dependencia[] = [];
    circuitos: Dependencia[] = []
    subcircuitoForm!: UntypedFormGroup;

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
        this.subcircuitoForm = this.formBuilder.group({
            idProvincia: new FormControl("", [Validators.required]),
            //idCanton: new FormControl("", [Validators.required]),
            idDistrito: new FormControl("", [Validators.required]),
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

    obtenerCircuito() {
        this.dependenciaService.obtenerDependenciaParent(this.model["idDistrito"].value).subscribe(response => {
            this.circuitos = response;
        })
    }

    obtenerParroquias() {
        const dependencia = this.circuitos.filter(circuito => circuito.idDependencia === this.model['idParentDependencia'].value);
        this.localidadService.obtenerLocalidad(dependencia[0].localidad?.idLocalidad!).subscribe(response => {
            this.parroquias = response;
        });
    }

    get model() {
        return this.subcircuitoForm.controls;
    }
    
}
