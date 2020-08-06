export interface ClienteItemDto {
    id: {
        empresa: string;
        cliente: string;
        item: string;    
    }
    itemCliente: string;
    descricao: string;
}

/*
PARA LISTAR:
  <ion-list >
    <ion-item color="tabela">
      <ion-col >empresa</ion-col>
      <ion-col >cliente</ion-col>
      <ion-col >item-cli</ion-col>
      <ion-col >descrição</ion-col>
    </ion-item>
    <ion-item-sliding *ngFor="let obj of popup">      
      <ion-item class="tabela" (click)="showObject(obj.id)">
        <ion-col  > {{ obj.id.empresa }}</ion-col>
        <ion-col  > {{ obj.id.cliente }}</ion-col>
        <ion-col  > {{ obj.itemCliente }}</ion-col>
        <ion-col  > {{ obj.descricao }}</ion-col>
      </ion-item>  
    </ion-item-sliding>
  </ion-list>

*/