import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { ModuloDto } from 'src/models/modulo.dto';
import { EmpresaDto } from 'src/models/empresa.dto';

@Injectable() //possibilita a injeção do serviço
export class EmpresaService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findAll() : Observable<EmpresaDto[]> {
        return this.http.get<EmpresaDto[]>(`${API_CONFIG.apiUrl}/empresa`);
    }

    findCompanyAuth() : Observable<EmpresaDto[]> {
        return this.http.get<EmpresaDto[]>(
            `${API_CONFIG.apiUrl}/empresa/autorizada`);
    }

}
