import { Component, OnInit } from '@angular/core';
import { opportunity } from 'src/app/demo/api/opportunity';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CountryService } from 'src/app/demo/service/country.service';
import { Country } from 'src/app/demo/api/Country';
import { Currency } from 'src/app/demo/api/Currency';
import { CurrencyService } from 'src/app/demo/service/currency.service';
import { StaffService } from 'src/app/demo/service/staff.service';
import { Staff } from 'src/app/demo/api/Staff';
import { Router } from '@angular/router';
import { Client } from 'src/app/demo/api/Client';
import { ClientService } from 'src/app/demo/service/client.service';
import { OpportunityService } from 'src/app/demo/service/opportunity.service';
import { MisajourOpportunityService } from 'src/app/demo/service/MisajourOpportunity.service';
import { MisajourOpportunity } from 'src/app/demo/api/MisajourOpportunity';
import * as XLSX from 'xlsx';


@Component({
    templateUrl: './opportunity.component.html',
    providers: [MessageService,CurrencyService,CountryService,StaffService]
})
export class opportunityComponent implements OnInit {
    countries: Country[] = [];

    currencies: Currency[] =[];

    listStaff: Staff[]=[];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];
    clients: Client[]=[];
    client:Client={};

    Misajours:MisajourOpportunity[]=[];
    Misajour:MisajourOpportunity={};


    opportunity : opportunity ={};
    opportunities : opportunity[] =[];

    opportunityDialog: boolean = false;
    MisajouropportunityDialog: boolean = false;

    StaffDialog: boolean =false;

    submitted: boolean = false;

    cols: any[] = [];
    volumeUnits: any[]=[{volumeUnit:"Kg"},{volumeUnit:"TEU"},{volumeUnit:"CBM"},]
    competitions: any[]=[{competition:"faible"},{competition:"moyenne"},{competition:"Forte"}]
    AddressTypes: any[]=[{AddressType:"adresse privée"},{AddressType:"port"},{AddressType:"gare"},{AddressType:"station aérienne"}];
    statuses: any[]=[{status:"en attente"},{status:"en cours"},{status:"à moitié fermée"},{status:"presque fermée"},{status:"fermée"},]

    FullName:string=" ";

    Staff: Staff={};



    constructor(private router: Router,private clientService: ClientService,
      private messageService: MessageService, private countryService: CountryService,private StaffService: StaffService, private opportunityService:OpportunityService,private MisajourService: MisajourOpportunityService) { }

    ngOnInit() {
      this.clientService.getClients().subscribe({next: (data: Client[])=>{this.clients=data;}});
      this.StaffService.listStaff().subscribe({next:(data:Staff[])=> {this.listStaff=data;}});
      this.countryService.getAllCountries().subscribe({next:(data:Country[])=> {this.countries = data;}});
      this.opportunityService.getOpportunities().subscribe({next: (data: opportunity[])=>{this.opportunities=data;}});

    }

    onStaffSelectionChange(selectedStaff: any) {
      if (selectedStaff && selectedStaff.staffId) {
        this.Staff.staffId = selectedStaff.staffId;
      }
    }

    ajouterOpportunity(){
      this.opportunity = {};
      this.submitted = false;
      this.opportunityDialog = true;
    }

    ajoutermisajour(){
      this.submitted = true;
      if(this.Misajour.status){
        this.Misajour.opportunityId=this.opportunity.opportunityid;
        // this.Misajour.dateCreated=new Date();
        // this.Misajours.push({this.Misajour});
        this.MisajourService.addNewMisajour(this.opportunity.opportunityid!,this.Misajour).subscribe();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Le commentaire a été ajouté avec succès', life: 3000 });

          setTimeout(() => {
              // Your code here
              // this.Misajours=[];
              this.MisajourService.getMisajoursOpportunity(this.opportunity.opportunityid!).subscribe({next:(data:MisajourOpportunity[])=> {this.Misajours= data;console.log(data);}});
          }, 500);

          // this.misajour(this.opportunity);
      }
    }


    misajour(opportunity: opportunity) {
      this.submitted = false;
      this.Misajour={}
      this.opportunity = { ...opportunity };
      this.MisajouropportunityDialog = true;

      this.Misajours=[];
      this.MisajourService.getMisajoursOpportunity(this.opportunity.opportunityid!).subscribe({next:(data:MisajourOpportunity[])=> {this.Misajours= data;console.log(data);}});
    }

    deletemisajour(misajour:MisajourOpportunity){
      this.MisajourService.deleteMisajourOfOpportunity(misajour.misajourId!).subscribe();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Le commentaire a été supprimé avec succès', life: 3000 });

      // this.Misajours = this.Misajours.filter(val => val.misajourId !== this.Misajour.misajourId);
        setTimeout(() => {
            // Your code here
            // this.Misajours=[];
            this.MisajourService.getMisajoursOpportunity(this.opportunity.opportunityid!).subscribe({next:(data:MisajourOpportunity[])=> {this.Misajours= data;},
            error:(error)=>{
                this.Misajours=[];
            }});
        }, 500);

    }

    editopportunity(opportunity: opportunity) {
        this.opportunity = { ...opportunity };
        this.opportunityDialog = true;
    }


    hideDialog() {
        this.opportunityDialog = false;
        this.submitted = false;
        this.StaffDialog=false;
    }


    saveopportunity() {
      this.submitted = true;

        if (this.opportunity.startDate&&this.opportunity.endDate&&this.opportunity.service?.trim()&&this.opportunity.staffid&&this.opportunity.competition&&this.opportunity.origineAddressType&&this.opportunity.origineCountry&&this.opportunity.origineAddress?.trim()&&this.opportunity.clientid&&this.opportunity.activity?.trim()) {
          if (this.opportunity.opportunityid) {
            console.log("la modification de opportunity", this.opportunity);// la modification de opportunity
            this.opportunityService.updateOpportunity(this.opportunity.opportunityid, this.opportunity).subscribe(
              response => {
              if (response.message === 'L\'opportunité a été modifié avec succès') {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                this.ngOnInit();
              } else {
                this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification d\'opportunité',life: 3000});
              }},error => {
                this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification d\'opportunité',life: 3000});});

              } else if (!this.opportunity.opportunityid) {// la creation de opportunity
                console.log("la creation de opportunity", this.opportunity);
                this.opportunityService.addNewOpportunity(this.opportunity).subscribe(responseMessage => {
                if (responseMessage === 'L\'opportunité a été ajouté avec succès') {
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'L\'opportunité a été ajouté avec succès', life: 3000 });
                  this.ngOnInit();



                }else {
                  this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de l\'ajout d\'opportunité',life: 3000});
                }
              });
          }

          this.opportunities = [...this.opportunities];
          // this.opportunities.push(this.opportunity);
          this.opportunityDialog = false;
          this.opportunity = {};
          // this.opportunities = [...this.opportunities];

        } else{
          this.messageService.add({severity: 'warn',summary: 'Warning Message',detail: 'Remplir les champs vides!',life: 3000});
        }

    }

    Terminer(){
      this.StaffDialog = false;
      //this.opportunitys = [...this.opportunitys];
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
        {field:'clientName', header: 'Client' },
        {field:'service', header: 'Service'},
        {field:'volume', header: 'Volume' },
        {field:'volumeUnit', header: 'Unité' },
      ];
      let filteredData = this.opportunities.map((row: opportunity) => {
        const newRow: any = {};
        for (const column of columnsToExport) newRow[column.header] = row[column.field as keyof opportunity];
        return newRow;
      });

      const headers = columnsToExport.map(column => column.header);
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData, { header: headers });
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'liste-Opprtunity.xlsx';
      downloadLink.click();

  }
}



