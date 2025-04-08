import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});

export class BaseService {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    listarTodos() {
        return axiosInstance.get(this.url);
    }

    buscarPordId(id: number) {
        return axiosInstance.get(`${this.url}/${id}`);
    }

    inserir(objeto: any) {
        console.log('Objeto a ser inserido:', objeto); // Debugging line
        console.log('URL:', this.url); // Debugging line

        return axiosInstance.post(this.url, objeto);
    }

    atualizar(id: number, objeto: any) {
        return axiosInstance.put(`${this.url}/${id}`, objeto);
    }

    deletar(id: number) {
        return axiosInstance.delete(`${this.url}/${id}`);
    }
}
