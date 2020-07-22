import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioDto } from 'src/models/usuario.dto';
import { PerfilDto } from 'src/models/perfil.dto';
import { PerfilService } from 'src/services/perfil.service';
import { UsuarioService } from 'src/services/usuario.service';
import { LoadingService } from 'src/services/loading.service';
import { NavController } from '@ionic/angular';
import { AppFunction } from 'src/app/app.function';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({ 
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  fg: FormGroup;
  model: UsuarioDto;
  perfis: PerfilDto[] = [];
  desabilita : boolean; 
  excluir: boolean;
  loader: any;
  id: string;
 
  constructor(
    private formBuilder: FormBuilder, 
    private loading: LoadingService,
    private perfilService: PerfilService,
    private service: UsuarioService,
    private navCtrl: NavController, 
    private appFunc: AppFunction,
    public route: ActivatedRoute 

  ) {
    this.route.paramMap.subscribe( (params:ParamMap) =>  { 
        this.id = params.get("id")
     })
  }

  //ao criar a página
  ngOnInit() {
    this.fg = this.formBuilder.group({
      id:       ['', []],  
      pessoa:   ['', [Validators.required]], 
      codigo:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      senha:    ['', []],
      nome:     ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email:    ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      cpfCnpj:  ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      perfil:   ['', [Validators.required]],
      telefone: ['', []],
      celular:  ['', []],  
      situacao: ['', [Validators.required]], 
      codigoErp:['', []]
    })
  }

  //Cada vez que a página for aberta
  ionViewWillEnter() {
    this.perfilService.findAll()
    .subscribe(response => {
      this.perfis = response;
    },
    error => {
      console.log(error);
    });

    if (this.id == '0') {
      this.fg.controls.id.setValue(this.id);
      this.fg.controls.situacao.setValue('I');
      this.desabilita = false;
      this.excluir = false;
    } else {
      this.desabilita = true;
      this.service.findById(this.id) //chamada assincrona da função
      .subscribe(
        response => { //função executa na resposta, se tudo ok
          this.model = response; //captura os usuários
          this.setValues();
        },
        error => {}); //função executada se der erro 
    }    
  
  }
 
    //atribui valores aos campos
    setValues() {
      this.fg.controls.id.setValue(this.model.id);
      this.fg.controls.pessoa.setValue(this.model.pessoa);
      this.fg.controls.codigo.setValue(this.model.codigo);
      this.fg.controls.nome.setValue(this.model.nome);
      this.fg.controls.email.setValue(this.model.email);
      this.fg.controls.cpfCnpj.setValue(this.model.cpfCnpj);
      this.fg.controls.perfil.setValue(this.model.perfil);
      this.fg.controls.telefone.setValue(this.model.telefone);
      this.fg.controls.celular.setValue(this.model.celular);
      this.fg.controls.situacao.setValue(this.model.situacao);
      this.fg.controls.codigoErp.setValue(this.model.codigoErp);
     
      if (this.fg.controls.situacao.value == 'I') {
        this.excluir = true;
      }
  
    }
  
  save() {      
    if (this.fg.controls.id.value == 0) {
      this.insert();
    } else {
      this.update();
    } 
  }

  insert() {
    this.loading.loadingPresent();  
    this.service.insert(this.fg.value)
    .subscribe(response => {
      let url =  response.headers.get('Location');
      this.findIdByUrl(url);
      this.fg.controls.id.setValue(this.id);
      this.excluir = true;
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
    },
    error => {/*Não precisa tratar erros do back end, pois
      já existe um tratamento de erros global na classe error-interceptor.ts */
      this.loading.loadingDismiss();
     });
  }      
  
  findIdByUrl(url: string) {
    for (let i = url.length; i >=0;  i--) {
      let dig = url.substring(i,i+1)
      if (dig == '/') {
        this.id=url.substring(i+1,url.length);
        return;
      } 
    }    
  }

  update() {
    this.loading.loadingPresent();  
    this.service.update(this.fg.value)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
      if (this.fg.controls.situacao.value != 'I') {
        this.excluir = false;
      }
    },
    error => {
      this.loading.loadingDismiss();
    });    
  }      

  delete() {
    
    if (this.fg.controls.situacao.value == 'I') {
    } else {
      let texto = this.appFunc.getTexto("EXCLUSAO_INVALIDA");
      this.appFunc.presentToast(texto);
      return;
    }

    this.loading.loadingPresent();  
    this.service.delete(this.fg.controls.id.value)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
      this.model = null;
      this.navCtrl.back();
    },
    error => {
      this.loading.loadingDismiss();
    });        
  }

}
