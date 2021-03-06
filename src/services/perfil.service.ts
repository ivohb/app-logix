import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { PerfilDto } from 'src/models/perfil.dto';

@Injectable() //possibilita a injeção do serviço
export class PerfilService {

    
    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findById(id: string) : Observable<PerfilDto> {
        return this.http.get<PerfilDto>(
            `${API_CONFIG.apiUrl}/perfil/${id}`);
    }

    findAll() : Observable<PerfilDto[]> {
        //chaada do método get da API sem parâmetros
        return this.http.get<PerfilDto[]>(`${API_CONFIG.apiUrl}/perfil`);
    }

    findPage(page: number, lines:number, nome: string) {
        let url = 
            `${API_CONFIG.apiUrl}/perfil/page?pagina=${page}&linhas=${lines}&nome=${nome}`;
        return this.http.get<PerfilDto[]>(url);
    }

    insert(obj : PerfilDto) {
        return this.http.post(`${API_CONFIG.apiUrl}/perfil`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : PerfilDto) {
        console.log(obj.id);
        return this.http.put(`${API_CONFIG.apiUrl}/perfil/${obj.id}`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    delete(id : string) {
        return this.http.delete(`${API_CONFIG.apiUrl}/perfil/${id}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}