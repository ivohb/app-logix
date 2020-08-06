import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginDto } from '../models/login.dto';
import { LocalUser } from '../models/local_user';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { ForgotDto } from '../models/forgot.dto';
import { StorageService } from './storage.service';
import { API_CONFIG } from '../config/api.config';
import { Events } from '@ionic/angular';

@Injectable()
export class AuthService {
    
     //será usado para extrair o codigo do usuario a partir do token
     jwtHelper: JwtHelperService  = new JwtHelperService ();

    constructor(
        public http: HttpClient,
        public events: Events,
        private storage: StorageService  ) {
    }

    autenticacao(obj : LoginDto) {
        return this.http.post(
            `${API_CONFIG.apiUrl}/login`, 
            obj,
            {
                //utilizado para obter a resposta
                observe: 'response', 
                //infomra ao fremework que a resposta não é um json
                responseType: 'text' 
            });
    }

    forgot(obj : ForgotDto) {
        return this.http.post(
            `${API_CONFIG.apiUrl}/auth/forgot`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }); 
    }

    refreshToken() {
        
        return this.http.post(
            `${API_CONFIG.apiUrl}/auth/refresh_token`, 
            {}, //não tem parâmetros
            {
                observe: 'response',
                responseType: 'text'
            });
        
    }

    /*obtem token sem o prefixo Token
    * obtém o código do usuario incluido no token
    * cria e pupula obj user e o armazena no localStorage
    */ 
   login(token: string, profile: string, empresa: string) {
        let tok = token.substring(7); 
        let user : LocalUser = { 
            token: tok, 
            codigo: this.jwtHelper.decodeToken(tok).sub,
            perfil: profile,
            empresa: empresa
        };
        this.storage.setLocalUser(user); 
    }
 
    logout() {
        this.storage.setLocalUser(null);
    }
    
}