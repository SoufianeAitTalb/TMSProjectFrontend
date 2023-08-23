import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ContactClient } from 'src/app/demo/api/ContactClient';
import { ContactClientService } from 'src/app/demo/service/contactclient.service';

@Component({
  selector: 'app-contact-client',
  templateUrl: './contact-client.component.html',
  styleUrls: ['./contact-client.component.scss'],
  providers: [MessageService,ContactClientService]
})
export class ContactClientComponent implements OnInit {
  clientId!: bigint;
  Contacts:ContactClient[]=[];
  contact:ContactClient={};
  contactDialog: boolean = false;
  deleteContactDialog: boolean = false;
  submitted: boolean = false;
  cols:any[]=[];

  constructor(private route: ActivatedRoute,private contactService: ContactClientService, private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bigIntValue: bigint = BigInt(params['clientId']);
      this.clientId=bigIntValue;
    });
    
    this.contactService.getContactClient(this.clientId).subscribe({next:(data:ContactClient[])=> {this.Contacts= data;}});


  }
  confirmDelete(){
    this.deleteContactDialog = false;
    this.contactService.deleteContactOfClient(this.contact.contactId!).subscribe(
      response => {
        if (response.message === 'Le contact a été supprimé avec succès') {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
          this.Contacts = this.Contacts.filter(val => val.contactId !== this.contact.contactId);
        }else{
          this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la suppression du clontact',life: 3000});
        }
      })
      this.contact = {};
  }
  hideDialog(){
    this.contactDialog = false;
    this.submitted = false;
    
    //this.clientService.getClients().subscribe({next: (data: Client[])=>{this.clients=data;}});
  }
  newContact(){
    this.contact = {};
    this.submitted = false;
    this.contactDialog = true;
  }
  saveContact() {
    this.submitted = true;
    if (this.contact.firstName?.trim()&&this.contact.lastName?.trim()&&this.contact.email?.trim()&&this.contact.phoneNumber?.trim()&&this.contact.title?.trim()) {
      if (this.contact.contactId) {//update
        this.contact.clientId=this.clientId.valueOf();
        this.contactService.updateClientContact(this.contact.contactId!,this.clientId!, this.contact).subscribe(
          response => {
            if (response.message === 'Le contact a été modifié avec succès') {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
            } else {
              this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification du clontact',life: 3000});
            }
          },error => { 
            this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification du contact',life: 3000});
          });

      }else{//creation
        
        this.contactService.addNewContact(this.clientId,this.contact).subscribe(responseMessage => {
          if (responseMessage === 'Le contact a été ajouté avec succès') {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Le contact a été ajouté avec succès', life: 3000 });
          }else {
            this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification du contact',life: 3000});
          }
        },error => {  this.messageService.add({severity: 'error',summary: 'Error',detail: 'Cet email est déjà utilisé',life: 3000});
          }); 
      }
          this.Contacts = [...this.Contacts];
          this.contactDialog = false;
          this.contact = {};
          this.ngOnInit()
          
        } else{
           this.messageService.add({severity: 'warn',summary: 'Warning Message',detail: 'Remplir les champs vides!',life: 3000});
           
        }
  }

  editContact(contact: ContactClient){
    this.contact = { ...contact };
    this.contactDialog = true;

  }
  deleteContact(contact: ContactClient){
    this.deleteContactDialog = true;
    this.contact = { ...contact };

  }
  onActiveChange(newValue: boolean,ContactId:bigint) {
    this.contact.active = newValue;
    this.contactService.updateContactActiveStatus(ContactId, newValue).subscribe(
      updatedContact => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Le contact a été modifié avec succès', life: 3000 });
       
      },
      error => {
        console.error('Error updating contact:', error);
        this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification du contact',life: 3000});
      }
    );

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

}