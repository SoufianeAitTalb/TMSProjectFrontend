import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/demo/api/Client';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CountryService } from 'src/app/demo/service/country.service';
import { ClientService } from 'src/app/demo/service/client.service';
import { ContactClientService } from 'src/app/demo/service/contactclient.service';
import { Country } from 'src/app/demo/api/Country';
import { Currency } from 'src/app/demo/api/Currency';
import { CurrencyService } from 'src/app/demo/service/currency.service';
import { StaffService } from 'src/app/demo/service/staff.service';
import { Staff } from 'src/app/demo/api/Staff';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';


@Component({
    templateUrl: './client.component.html',
    providers: [MessageService,ClientService,ContactClientService,CurrencyService,CountryService,StaffService]
})
export class clientComponent implements OnInit {
    countries: Country[] = [];

    currencies: Currency[] =[];

    listStaff: Staff[]=[];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];





    client : Client ={};
    clients : Client[] =[];

    clientDialog: boolean = false;
    deleteClientDialog: boolean = false;
    StaffDialog: boolean =false;

    submitted: boolean = false;

    cols: any[] = [];


    Total_Clients : number =0;
    Total_Active_Clients : number =0;
    Total_Inactive_Clients : number =0;

    Total_Contacts : number =0;
    Total_Active_Contacts : number =0;
    Total_Inactive_Contacts : number =0;
    FullName:string=" ";

    Staff: Staff={};


    constructor(private router: Router,private clientService: ClientService,private contactService: ContactClientService,
      private messageService: MessageService, private countryService: CountryService, private currencyService: CurrencyService,
      private StaffService: StaffService) { }

    ngOnInit() {
      this.clientService.countClients().subscribe({next: (data: number)=>{this.Total_Clients =data;}});
      this.clientService.countActiveClients().subscribe({next: (data: number)=>{this.Total_Active_Clients =data;}});
      this.clientService.countInactiveClients().subscribe({next: (data: number)=>{this.Total_Inactive_Clients =data;}});

      this.contactService.countContacts().subscribe({next: (data: number)=>{this.Total_Contacts =data;}});
      this.contactService.countActiveContacts().subscribe({next: (data: number)=>{this.Total_Active_Contacts =data;}});
      this.contactService.countInactiveContacts().subscribe({next: (data: number)=>{this.Total_Inactive_Contacts =data;}});

      this.clientService.getClients().subscribe({next: (data: Client[])=>{this.clients=data;console.log(data);}});
      this.StaffService.listStaff().subscribe({next:(data:Staff[])=> {this.listStaff=data;}});

      this.countryService.getAllCountries().subscribe({next:(data:Country[])=> {this.countries = data;}});
      this.currencyService.getAllCurrencies().subscribe({next:(data:Currency[])=> {this.currencies=data;}});
    }

  navigateToContactClient(clientId: bigint) {
    this.router.navigate(['/crm/client/ContactClient', clientId]);
  }



  onCountrySelectionChangeS(selectedCountry: any) {
    if (selectedCountry && selectedCountry.countryId) {
      this.client.shippingCountryId = selectedCountry.countryId;
    }
  }
  onCountrySelectionChangeB(selectedCountry: any) {
    if (selectedCountry && selectedCountry.countryId) {
      this.client.billingCountryId = selectedCountry.countryId;
    }
  }
  onCountrySelectionChange(selectedCountry: any) {
    if (selectedCountry && selectedCountry.countryId) {
      this.client.countryId = selectedCountry.countryId;
    }
  }

  onCurrencySelectionChange(selectedCurrency: any) {
    if (selectedCurrency && selectedCurrency.currencyId) {
      this.client.defaultCurrencyId = selectedCurrency.currencyId;
    }
  }
  onStaffSelectionChange(selectedStaff: any) {
    if (selectedStaff && selectedStaff.staffId) {
      this.Staff.staffId = selectedStaff.staffId;
    }
  }




    ajouterClient(){
        this.client = {};
        this.submitted = false;
        this.clientDialog = true;
    }

    commercial(client: Client) {
      this.Staff={}
      this.client = { ...client };
      this.StaffDialog = true;
    }




    editClient(client: Client) {
        this.client = { ...client };
        this.clientDialog = true;
    }


    //delete client
    deleteClient(client: Client) {
        this.deleteClientDialog = true;
        this.client = { ...client };
    }
    confirmDelete(){
      this.deleteClientDialog = false;
      this.clientService.deleteClientById(this.client.clientId!).subscribe(
        response => {
          if (response.message === 'Le client a été supprimé avec succès') {
            this.clientService.getClients().subscribe({next: (data: Client[])=>{this.clients=data;}});
            this.clients = this.clients.filter(val => val.clientId !== this.client.clientId);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
          }else{
            this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la suppression du client',life: 3000});
          }
        })
        this.client = {};
    }


    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
        this.StaffDialog=false;
        this.clientService.getClients().subscribe({next: (data: Client[])=>{this.clients=data;}});
    }


    saveClient() {
        this.submitted = true;
        if (this.client.company?.trim()&&this.client.iceClient?.trim()&&this.client.address?.trim()&&this.client.city?.trim()&&this.client.codeComptable?.trim()&&this.client.codeAuxi?.trim()&&this.client.defaultCurrencyId ) {
          if (this.client.clientId) {// la modification de client
            this.clientService.updateClient(this.client.clientId, this.client).subscribe(
              response => {
              if (response.message === 'Le client a été modifié avec succès') {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
              } else {
                this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification du client',life: 3000});
              }},error => {
                this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification du client',life: 3000});});

              } else if (!this.client.clientId) {// la creation de client

                this.clientService.addNewClient(this.client).subscribe(responseMessage => {
                if (responseMessage === 'Le client a été ajouté avec succès') {
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Le client a été ajouté avec succès', life: 3000 });
                }else {
                  this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de l\'ajout du client',life: 3000});
                }
              },error => {  this.messageService.add({severity: 'error',summary: 'Error',detail: 'Cet email est déjà utilisé',life: 3000
                    });
                });
          }
          this.clients = [...this.clients];
          this.clientDialog = false;
          this.client = {};
          this.ngOnInit()

        } else{
          this.messageService.add({severity: 'warn',summary: 'Warning Message',detail: 'Remplir les champs vides!',life: 3000});
        }
      }

      AffectCommercial(){
        if(this.client.clientId&& this.Staff.staffId){
          this.clientService.affectCommercialToClient(this.client.clientId, this.Staff.staffId).subscribe();
          this.clients = [...this.clients];
          this.Staff={}
          this.ngOnInit()
        }

      }
      SupprimerCommercial(){
        if(this.client.clientId){
          this.clientService.deleteCommercialOfClient(this.client.clientId).subscribe();
          this.clients = [...this.clients];
          this.Staff={}
          this.ngOnInit()
        }
      }
      Terminer(){
      this.StaffDialog = false;
      this.clients = [...this.clients];
      this.Staff={}
      this.ngOnInit()


      }

      formatDate(components: number[]): string {
        const day = components[2];
        const month = components[1];
        const year = components[0];
        const hour = components[3];
        const minute = components[4];

        const formattedDate = `${day}/${month}/${year}  ${hour}:${minute}`;
        return formattedDate;
      }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    exportToExcel(): void {
      const columnsToExport = [
        {field:'company', header: 'Societé' },
        {field:'staffFullName', header: 'Commercial'},
        {field:'email', header: 'Email' },
        {field:'phoneNumber', header: 'Tél' }];
      let filteredData = this.clients.map((row: Client) => {
        const newRow: any = {};
        for (const column of columnsToExport) newRow[column.header] = row[column.field as keyof Client];
        return newRow;
      });

      const headers = columnsToExport.map(column => column.header);
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData, { header: headers });
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'liste-Clients.xlsx';
      downloadLink.click();

  }

  copierAdresseFacturation() {
    this.client.shippingCountryId = this.client.billingCountryId;
    this.client.shippingState = this.client.billingState;
    this.client.shippingCity = this.client.billingCity;
    this.client.shippingStreet = this.client.billingStreet;
    this.client.shippingZip = this.client.billingZip;
  }

  copierAdressePrincipal() {
    this.client.billingCountryId= this.client.countryId;
    this.client.billingCity= this.client.city;
    this.client.billingStreet= this.client.address;
    this.client.billingZip= this.client.zip;
  }


}




