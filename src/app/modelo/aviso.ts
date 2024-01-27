export class Aviso {

    constructor(
        public id:number,
        public titulo:string ="",
        public descripcion:string="",
        public imagen:string="",
        public fecha:Date = new Date
    ){}
}

