export interface Bodega {
    id: number;
    referencia: string;
    descripcion: string;
    estado: string;
    createdAt: string;
}

export interface CrearBodegaRequest {
    referencia: string;
    descripcion: string;
}

export interface ActualizarBodegaRequest {
    referencia: string;
    descripcion: string;
}
