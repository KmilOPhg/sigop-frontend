export interface Material {
    id: number;
    itemMaterial: string;
    nombreMaterial: string;
    unidadMedida: string;
    estado: string;
    createdAt: string;
}

export interface CrearMaterialRequest {
    itemMaterial: string;
    nombreMaterial: string;
    unidadMedida: string;
}

export interface ActualizarMaterialRequest {
    nombreMaterial: string;
    unidadMedida: string;
}
