/**
 * Funções diversas para uso em todo aplicativo
 */
export class AppFormat {

  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  valFormat: any;
  
  constructor(

  ) {    }

  format(val: string): string {
       
    if (!val) {
       return '';
    }
 
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    if(parts[0].length <= 11){
      this.valFormat = this.cpf_mask(parts[0]);
    }else{
      this.valFormat = this.cnpj(parts[0]);
    }

    return this.valFormat;

  }

  unFormat(v: any) {
    v = v.replace(/\D/g, '');
    if (this.GROUP_SEPARATOR === ',') {
       return v.replace(/,/g, '');
    } else {
      return v.replace(/\./g, '');
    }
  };
    
  cpf_mask(v: any) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }
    
  cnpj(v: any) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca um hífen depois do bloco de quatro dígitos
    return v;
  }
    
}
