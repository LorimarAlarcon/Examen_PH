import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormAvisosComponent } from 'src/app/componentes/form-avisos/form-avisos.component';
import { Aviso } from 'src/app/modelo/aviso';
import { AvisoService } from 'src/app/data/aviso.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  standalone: true,
  imports: [FormAvisosComponent, IonicModule, CommonModule, FormsModule]
})
export class PublicacionPage implements OnInit {

  listaAvisos: Aviso[] = [];

  constructor(private avisoService: AvisoService) { }

  ngOnInit() {
    this._actualizar();
  }

  private async _actualizar() {
    this.listaAvisos = await this.avisoService.getAvisos();
  }

  async onCrearAviso(nuevoAviso: Aviso) {
    const avisosActualizados = await this.avisoService.agregarAviso(nuevoAviso);
    this.listaAvisos = avisosActualizados;
  }
}
