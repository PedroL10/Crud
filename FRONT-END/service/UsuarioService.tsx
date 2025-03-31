import axios from 'axios';

export class UsuarioService {
    private apiUrl = 'http://localhost:8080/usuario';

    listarTodos() {
        return axios.get(this.apiUrl);
    }

    inserir(usuario: Projeto.Usuario) {
        const { id, ...usuarioSemId } = usuario;
        return axios.post(this.apiUrl, usuarioSemId);
    }

    atualizar(id: number, usuario: Projeto.Usuario) {
        return axios.put(`${this.apiUrl}/${id}`, usuario);
    }

    deletar(id: number) {
        return axios.delete(`${this.apiUrl}/${id}`);
    }
}
