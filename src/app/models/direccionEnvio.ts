export class direccionEnvio{
    codigoDireccion!: number;
    direccionCalles!: string;
    ciudad!: string;
    parroquia!: string;
    referencia!: string;
    codigoPostal!: string;
    telefono!: string;

    constructor(codigoDireccion: number,
        direccionCalles: string,
        ciudad: string,
        parroquia: string,
        referencia: string,
        codigoPostal: string,
        telefono: string){
            this.codigoDireccion=codigoDireccion;
            this.direccionCalles=direccionCalles;
            this.ciudad=ciudad;
            this.parroquia=parroquia;
            this.referencia=referencia;
            this.codigoPostal=codigoPostal;
            this.telefono=telefono;
    }

}