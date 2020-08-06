import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { ProcessoDto } from 'src/models/processo.dto';
import { API_CONFIG } from 'src/config/api.config';
import { LocalModulo } from 'src/models/local_modulo';
import { EdiClientProgramDto } from 'src/models/edi.client.program.dto';

@Injectable() //possibilita a injeção do serviço
export class EdiClientProgramService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findById(id: string) : Observable<EdiClientProgramDto> {
        return this.http.get<EdiClientProgramDto>(
            `${API_CONFIG.apiUrl}/edi/client/program/${id}`);
    }

    findByEdiCliente(ediCliente : number) : Observable<EdiClientProgramDto[]>  {
        return this.http.get<EdiClientProgramDto[]>
            (`${API_CONFIG.apiUrl}/edi/client/program/${ediCliente}/programacao`);
    }
    
    findPage(page: number, lines:number) {
        let url = 
            `${API_CONFIG.apiUrl}/edi/client/program/page?pagina=${page}&linhas=${lines}`;
        return this.http.get<EdiClientProgramDto[]>(url);
    }

    insert(obj : EdiClientProgramDto) {
        return this.http.post(`${API_CONFIG.apiUrl}/edi/client/program`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : EdiClientProgramDto) {
        console.log(obj.id);
        return this.http.put(`${API_CONFIG.apiUrl}/edi/client/program/${obj.id}`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    delete(id : string) {
        return this.http.delete(`${API_CONFIG.apiUrl}/edi/client/program/${id}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}