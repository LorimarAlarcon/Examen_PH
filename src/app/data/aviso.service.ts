import { Injectable, EventEmitter } from '@angular/core';
import { Aviso } from '../modelo/aviso';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  private readonly KEY_PREFERENCIAS = 'PREFERENCIAS'

  private _avisos:Aviso[] = [

    new Aviso(1, "Mascota Perdida", "Perrito Salchicha perdido","https://www.buscomiperroperdido.com/Catalogo/Item/2226_Item/perro-Perdido-Cadiz-Sanlucar-de-barrameda-2.jpeg"),
    new Aviso(2, "Cédula encontrada", "Se encontro esta cédula de identidad en la calle","https://assets.adnradio.cl/2023/04/Carnet-de-identidad.jpg")
  ]

  constructor() { 
    this.recuperarPreferencias();
  }


  async agregarAviso(aviso: Aviso): Promise<Aviso[]> {
    aviso.id = Date.now();
    const existe = this._avisos.some(a => a.titulo === aviso.titulo && a.descripcion === aviso.descripcion);
    if (!existe) {
      this._avisos.push(aviso);
    }
    await this.guardarPreferencias();
    return this._avisos
  }

  async getAvisos(): Promise<Aviso[]> {
    console.dir(this._avisos)
    return this._avisos
  }

  private _buscarindice(aviso:Aviso): number {
    return this._avisos.findIndex(avis => avis.id === aviso.id)
  }

  async eliminarAviso(aviso: Aviso) {
    const indice = this._buscarindice(aviso);
    if (indice >= 0) {
      this._avisos.splice(indice, 1);
      await this.guardarPreferencias();
    }
  }

  private async guardarPreferencias() {
    await Preferences.set({key: this.KEY_PREFERENCIAS, value: JSON.stringify(this._avisos)})
  }

  async recuperarPreferencias() {
    const {value} = await Preferences.get({key: this.KEY_PREFERENCIAS})
    if (value) {
      this._avisos = JSON.parse(value);
    }
  }
}
