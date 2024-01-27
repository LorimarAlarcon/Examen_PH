import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Aviso } from 'src/app/modelo/aviso';
import { AvisoService } from 'src/app/data/aviso.service';
import { ListaAvisosComponent } from 'src/app/componentes/lista-avisos/lista-avisos.component';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
  standalone: true,
  imports: [ListaAvisosComponent, RouterModule, IonicModule, CommonModule, FormsModule]
})
export class PublicacionesPage implements OnInit {

  avisos: Aviso[] = [];

  constructor(
    private avisoService: AvisoService,
    ) 
    { 
    this.recargarDatos();
    addIcons({
      addCircle
    })
  }

  async ngOnInit() {
    
    await this.actualizarAvisos();
  }

  private async actualizarAvisos() {
    this.avisos = await this.avisoService.getAvisos()
  }

  private async recargarDatos() {
    await this.avisoService.recuperarPreferencias();
    this.avisos = await this.avisoService.getAvisos();
  }
}

