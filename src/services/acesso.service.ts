import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { AcessoDto } from 'src/models/acesso.dto';

@Injectable() //possibilita a injeção do serviço
export class AcessoService {

    perfil: number = 0;
    modulo: number = 0;    

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findById(id: string) : Observable<AcessoDto> {
        return this.http.get<AcessoDto>(
            `${API_CONFIG.apiUrl}/acesso/${id}`);
    }

    findAll() : Observable<AcessoDto[]> {
        //chaada do método get da API sem parâmetros
        return this.http.get<AcessoDto[]>(`${API_CONFIG.apiUrl}/acesso`);
    }

    findPage(page: number, lines:number) {
        let url = 
            `${API_CONFIG.apiUrl}/acesso/page?pagina=${page}&linhas=${lines}
              &perfil=${this.perfil}&modulo=${this.modulo}`;
        return this.http.get<AcessoDto[]>(url);
    }

    insert(obj : AcessoDto) {
        return this.http.post(`${API_CONFIG.apiUrl}/acesso`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : AcessoDto) {
        console.log(obj.id);
        return this.http.put(`${API_CONFIG.apiUrl}/acesso/${obj.id}`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    delete(id : string) {
        return this.http.delete(`${API_CONFIG.apiUrl}/acesso/${id}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}