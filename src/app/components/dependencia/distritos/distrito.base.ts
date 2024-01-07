import { Component, OnInit } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Localidad } from "../../../models/localidad";
import { LocalidadService } from "../../../services/app/localidad.service";

@Component({
    template: ''
})
export class DistritoBase implements OnInit {

    distritoForm!: UntypedFormGroup;
    localidades: Localidad[] = [];
    visible: boolean = false;

    constructor(public formBuilder: UntypedFormBuilder, private localidadService: LocalidadService) { }

    ngOnInit(): void {
        this.localidadService.obtenerProvincias().subscribe(reponse => {
            this.localidades = reponse;
        });
    }

    createForm() {
        this.distritoForm = this.formBuilder.group({
            idLocalidad: new FormControl("", [Validators.required]),
            idDependencia: new FormControl("", [Validators.required]),
            nombreDependencia: new FormControl("", [Validators.required]),
        });
    }

}
