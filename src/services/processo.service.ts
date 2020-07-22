import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { ProcessoDto } from 'src/models/processo.dto';
import { API_CONFIG } from 'src/config/api.config';
import { LocalModulo } from 'src/models/local_modulo';

@Injectable() //possibilita a injeção do serviço
export class ProcessoService {

    modulo: number = 0;
    titulo: string = '';
    situacao: string = ''; 

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findById(id: string) : Observable<ProcessoDto> {
        return this.http.get<ProcessoDto>(
            `${API_CONFIG.apiUrl}/processo/${id}`);
    }

    findPage(page: number, lines:number) {
        let url = 
            `${API_CONFIG.apiUrl}/processo/page?pagina=${page}&linhas=${lines}
              &modulo=${this.modulo}&titulo=${this.titulo}&situacao=${this.situacao}`;
        return this.http.get<ProcessoDto[]>(url);
    }

    findNoAccess(perfil: number, modulo: number) {
        let url =`${API_CONFIG.apiUrl}/processo/processos?perfil=${perfil}&modulo=${modulo}`;
        return this.http.get<ProcessoDto[]>(url);
    }

    insert(obj : ProcessoDto) {
        return this.http.post(`${API_CONFIG.apiUrl}/processo`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : ProcessoDto) {
        console.log(obj.id);
        return this.http.put(`${API_CONFIG.apiUrl}/processo/${obj.id}`, obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    delete(id : string) {
        return this.http.delete(`${API_CONFIG.apiUrl}/processo/${id}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    //salva o módulo selecionado no local storage
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

    //A partir do perfil, retorna todos os processos que o usuário pode acessar
    findByModulo(modulo : number) : Observable<ProcessoDto[]>  {
        return this.http.get<ProcessoDto[]>
            (`${API_CONFIG.apiUrl}/processo/${modulo}/processos`);
    }
    
    //retorna os acessos que o usuário possui no módulo enviado
    findByPerfilAndModulo(modulo: string) : Observable<ProcessoDto[]>  {
        return this.http.get<ProcessoDto[]>
            (`${API_CONFIG.apiUrl}/processo/acessos?modulo=${modulo}`);
    }


}