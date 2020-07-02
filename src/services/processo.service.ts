import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { ProcessoDto } from 'src/models/processo.dto';
import { API_CONFIG } from 'src/config/api.config';
import { LocalModulo } from 'src/models/local_modulo';

@Injectable() //possibilita a injeção do serviço
export class ProcessoService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

        /*obtem token sem o prefixo Token
    * cria e pupula obj user e o armazena no localStorage
    * obtém o código do usuario incluido no token
    */ 
   setModulo(id : string) {
    let module : LocalModulo = { 
        modulo: id
        };
    this.storage.setLocalModulo(module); 
    }

    //A partir do perfil, retorna todos os processos que o usuário pode acessar
    findByPerfil(perfil : string) : Observable<ProcessoDto[]>  {
        return this.http.get<ProcessoDto[]>
            (`${API_CONFIG.apiUrl}/processo/${perfil}/acessos`);
    }

    //A partir do perfil e do módulo, retorna todos os processos que o usuário pode acessar
    //No back-end, o perfil será obtido a partir do usuário logado
    findByPerfilAndModulo(modulo: string) : Observable<ProcessoDto[]>  {
        return this.http.get<ProcessoDto[]>
            (`${API_CONFIG.apiUrl}/processo/acessos?modulo=${modulo}`);
    }


}