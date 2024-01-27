import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvisoService } from 'src/app/data/aviso.service';
import { Aviso } from 'src/app/modelo/aviso';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-form-avisos',
  templateUrl: './form-avisos.component.html',
  styleUrls: ['./form-avisos.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule]
})
export class FormAvisosComponent  implements OnInit {

  aviso:Aviso = {id:Date.now(), titulo:'', descripcion:'', imagen:'', fecha: new Date}
  
  @Output() onAvisoAgregado = new EventEmitter<Aviso>()

  foto:Photo | null = null
  
  constructor(
    private avisoService: AvisoService,
    private router:Router
  ) { 
    addIcons ({
      cameraOutline
    })
  }

  ngOnInit() {
  }

  async capturarFoto() {
    try {
      this.foto = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        saveToGallery: true,
        correctOrientation: true,
      });

      this.aviso.imagen = this.foto?.webPath || '';

    } catch (error) {
      console.error('Error al capturar la foto:', error);
    }
  }

  async onClick() {
    await this.avisoService.agregarAviso(this.aviso);
    this.aviso.imagen = this.foto?.webPath || '';
    this.onAvisoAgregado.emit(this.aviso);
    this.aviso = { id: Date.now(), titulo: '', descripcion: '', imagen: '', fecha: new Date };
    this.foto = null;
    this.router.navigate(['publicaciones']);
  }
}
