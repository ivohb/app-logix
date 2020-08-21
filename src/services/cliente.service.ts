import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { ModuloDto } from 'src/models/modulo.dto';
import { EmpresaDto } from 'src/models/empresa.dto';
import { LocalCliente } from 'src/models/local.cliente';
import { ClienteDto } from 'src/models/cliente.dto';

@Injectable() 
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    //salva indicador de cliente no local storage
    setLocalStorage(codigo : string) {
        let cliente : LocalCliente = { 
            cliente: codigo
        };
        this.storage.setLocalCliente(cliente); 
    }

    //busca cliente pelo cpf ou cnpj do usuário
    findByUser() : Observable<ClienteDto>  {
        return  this.http.get<ClienteDto>(`${API_CONFIG.apiUrl}/cliente/cnpj/user`);
    }

    findById(id: string) : Observable<ClienteDto> {
        return this.http.get<ClienteDto>(
            `${API_CONFIG.apiUrl}/processo/${id}`);
    }


}
