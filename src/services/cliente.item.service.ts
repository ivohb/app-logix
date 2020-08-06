import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { ClienteItemDto } from 'src/models/cliente.item.dto.';

@Injectable() //possibilita a injeção do serviço
export class ClienteItemService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findByEmpresa(empresa: string) : Observable<ClienteItemDto[]>  {
        return this.http.get<ClienteItemDto[]>
            (`${API_CONFIG.apiUrl}/cliente/item/empresa?empresa=${empresa}`);
    }


}