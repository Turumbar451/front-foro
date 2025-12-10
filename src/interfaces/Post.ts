export interface Post {
    id: string;
    titulo: string;
    descripcion: string;
    autorId: string;
    nombreAutor: string;
    likes: number;
    fechaCreacion: string;
    usuariosQueDieronLike: string[];
}