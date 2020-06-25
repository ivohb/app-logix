export interface UsuarioDto {
    id : string;
    pessoa : string;
    codigo : string;
    nome : string;
    senha : string;
    email : string;
    cpfCnpj : string;
    perfil : number;
    telefone : string;
    celular : string;
    situacao : string;
    codigoErp : string;
    imageUrl? : string; //(?) indica campo opcional - não vem do back end
} 