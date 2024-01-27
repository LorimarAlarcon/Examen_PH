import { Component, Input, OnInit } from '@angular/core';
import { Aviso } from 'src/app/modelo/aviso';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvisoService } from 'src/app/data/aviso.service';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { ModalConfirmacionService } from 'src/app/data-modal/modal-confirmacion.service';


@Component({
  selector: 'app-lista-avisos',
  templateUrl: './lista-avisos.component.html',
  styleUrls: ['./lista-avisos.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule]
})
export class ListaAvisosComponent  implements OnInit {

  @Input() avisos:Aviso[] = []

  constructor(
    private avisoService:AvisoService,
    private modalConfirmacionService: ModalConfirmacionService) {
    addIcons ({
      trashOutline
    })
   }

  async ngOnInit() {
    await this.actualizarAvisos();
    console.log("ListaAvisosComponent::ngOnInit()")
  }

  ionViewWillEnter() {
    console.log("ListaAvisosComponent::ionViewWillEnter()")
  }

  private async actualizarAvisos() {
    this.avisos = await this.avisoService.getAvisos();
  }

  async confirmarEliminarAviso(aviso: Aviso) {
    const confirmado = await this.modalConfirmacionService.abrirModalConfirmacion();
  
    if (confirmado) {
      await this.avisoService.eliminarAviso(aviso);
    }
  }
}
