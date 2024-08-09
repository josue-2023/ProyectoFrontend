export class envio{
    id!: number;
    direccion!: string;
    fecha!: Date;
    fechaEntrega!: Date;
    metodoEnvio!: String;
    costoEnvio!: number;
    estadoEnvio!: string;

    constructor(id: number, direccion: string, fecha: Date, fechaEntrega: Date,
        metodoEnvio: String, costoEnvio: number,estadoEnvio: string
    ){
        this.id=id;
        this.direccion=direccion;
        this.fecha=fecha;
        this.fechaEntrega=fechaEntrega;
        this.metodoEnvio=metodoEnvio;
        this.costoEnvio=costoEnvio;
        this.estadoEnvio=estadoEnvio;
    }
}