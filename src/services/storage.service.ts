import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { LocalModulo } from 'src/models/local_modulo';
import { LocalEdi } from 'src/models/local_edi';

@Injectable()
export class StorageService {

    setLocalEdi(obj: LocalEdi) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localEdi); 
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localEdi, JSON.stringify(obj)); 
        }

    }

    getLocalEdi() : LocalEdi {
        let obj = localStorage.getItem(STORAGE_KEYS.localEdi);
        if (obj == null) {
            return null;
        }
        else {
            return JSON.parse(obj); //converte de string p/ json
        }
    }

    setLocalModulo(obj: LocalModulo) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localMudulo); //apaga usuário do localStorage
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localMudulo, JSON.stringify(obj)); 
        }

    }

    getLocalModulo() : LocalModulo {
        let obj = localStorage.getItem(STORAGE_KEYS.localMudulo);
        if (obj == null) {
            return null;
        }
        else {
            return JSON.parse(obj); //converte de string p/ json
        }
    }

    getLocalUser() : LocalUser {
        let obj = localStorage.getItem(STORAGE_KEYS.localUser);
        if (obj == null) {
            return null;
        }
        else {
            return JSON.parse(obj); //converte de string p/ json
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
