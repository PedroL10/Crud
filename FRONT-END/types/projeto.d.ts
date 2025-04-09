// Updated content of projeto.d.ts
export namespace Projeto {
    export interface Usuario {
        id: number;
        nome: string;
        login: string;
        senha: string;
        email: string;
    }

    export interface Recurso {
        id?: number;
        nome: string;
        chave: string;
    }

    export interface Perfil {
        id?: number;
        descricao: string;
    }

    export interface PerfilUsuario {
        id?: number;
        perfil: Perfil;
        usuario: Usuario;
    }

    export interface PermissaoPerfilRecurso {
        id?: number;
        perfil: Perfil;
        recurso: Recurso;
    }
}
