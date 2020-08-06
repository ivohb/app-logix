import { Injectable } from '@angular/core';
import { EdiClienteDto } from 'src/models/edi.cliente.dto';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';

@Injectable() //possibilita a injeção do serviço
export class EdiClienteService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findByEmpresa(empresa: string) : Observable<EdiClienteDto[]>  {
        return this.http.get<EdiClienteDto[]>
            (`${API_CONFIG.apiUrl}/edi/cliente/empresa?empresa=${empresa}`);
    }

    findByEmpresaAndSituacao(empresa: string, situacao: string) : Observable<EdiClienteDto[]>  {
        return this.http.get<EdiClienteDto[]>
            (`${API_CONFIG.apiUrl}/edi/cliente/empresa/situacao?empresa=${empresa}&situacao=${situacao}`);
    }

}