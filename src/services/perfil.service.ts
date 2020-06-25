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

    findAll() : Observable<PerfilDto[]> {
        //chaada do método get da API sem parâmetros
        return this.http.get<PerfilDto[]>(`${API_CONFIG.apiUrl}/perfil`);
    }

}