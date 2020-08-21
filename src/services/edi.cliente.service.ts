import { Injectable } from '@angular/core';
import { EdiClienteDto } from 'src/models/edi.cliente.dto';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { LocalEdi } from 'src/models/local_edi';

@Injectable() //possibilita a injeção do serviço
export class EdiClienteService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    setLocalStorage(id: string) { 
        let obj : LocalEdi = { 
            id: id
        };
        this.storage.setLocalEdi(obj);
    }

    findByEmpresa(empresa: string) : Observable<EdiClienteDto[]>  {
        return this.http.get<EdiClienteDto[]>
            (`${API_CONFIG.apiUrl}/edi/cliente/empresa?empresa=${empresa}`);
    }
   
    findByEmpresaAndSituacao(empresa: string, situacao: string) : Observable<EdiClienteDto[]>  {
        return this.http.get<EdiClienteDto[]>
            (`${API_CONFIG.apiUrl}/edi/cliente/empresa/situacao?empresa=${empresa}&situacao=${situacao}`);
    }

    findById(id: string) : Observable<EdiClienteDto> {
        return this.http.get<EdiClienteDto>(
            `${API_CONFIG.apiUrl}/edi/cliente/${id}`);
    }

    insert(obj : EdiClienteDto) {
        return this.http.post(`${API_CONFIG.apiUrl}/edi/cliente`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : EdiClienteDto) {
        console.log(obj.id);
        return this.http.put(`${API_CONFIG.apiUrl}/edi/cliente/${obj.id}`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    delete(id : string) {
        return this.http.delete(`${API_CONFIG.apiUrl}/edi/cliente/${id}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}