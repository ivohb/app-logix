import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { LocalModulo } from 'src/models/local_modulo';

@Injectable()
export class StorageService {

    setLocalModulo(obj: LocalModulo) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localMudulo); //apaga usuário do localStorage
        }
        else {
            //coloca no localStorage convertendo obj para string
            localStorage.setItem(STORAGE_KEYS.localMudulo, JSON.stringify(obj)); 
        }

    }

    getLocalModulo() : LocalModulo {
        let mod = localStorage.getItem(STORAGE_KEYS.localMudulo);
        if (mod == null) {
            return null;
        }
        else {
            return JSON.parse(mod); //converte de string p/ json
        }
    }

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr); //converte de string p/ json
        }
    }

    setLocalUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser); //apaga usuário do localStorage
        }
        else {
            //coloca no localStorage convertendo obj para string
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj)); 
        }
    }

}
