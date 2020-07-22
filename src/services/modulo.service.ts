import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { ModuloDto } from 'src/models/modulo.dto';

@Injectable() //possibilita a injeção do serviço
export class ModuloService {

    titulo: string = '';
    situacao: string = '';

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findAll() : Observable<ModuloDto[]> {
        //chaada do método get da API sem parâmetros
        return this.http.get<ModuloDto[]>(`${API_CONFIG.apiUrl}/modulo`);
    }

    findById(id: string) : Observable<ModuloDto> {
        return this.http.get<ModuloDto>(
            `${API_CONFIG.apiUrl}/modulo/${id}`);
    }

    findByPerfil(perfil : string) : Observable<ModuloDto[]>  {
        return this.http.get<ModuloDto[]>
            (`${API_CONFIG.apiUrl}/modulo/${perfil}/acessos`);
    }

    findPage(page: number, lines:number) {
        let url = 
            `${API_CONFIG.apiUrl}/modulo/page?pagina=${page}&linhas=${lines}
            &titulo=${this.titulo}&situacao=${this.situacao}`;
        return this.http.get<ModuloDto[]>(url);
    }

    insert(obj : ModuloDto) {
        return this.http.post(`${API_CONFIG.apiUrl}/modulo`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : ModuloDto) {
        console.log(obj.id);
        return this.http.put(`${API_CONFIG.apiUrl}/modulo/${obj.id}`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    delete(id : string) {
        return this.http.delete(`${API_CONFIG.apiUrl}/modulo/${id}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }


}