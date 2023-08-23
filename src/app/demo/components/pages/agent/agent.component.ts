import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CountryService } from 'src/app/demo/service/country.service';
import { AgentService } from 'src/app/demo/service/agent.service';
import { DatePipe } from '@angular/common';
import { Country } from 'src/app/demo/api/Country';
import { Currency } from 'src/app/demo/api/Currency';
import { CurrencyService } from 'src/app/demo/service/currency.service';
import { StaffService } from 'src/app/demo/service/staff.service';
import { Staff } from 'src/app/demo/api/Staff';
import {Agent} from "../../../api/Agent";

import * as XLSX from 'xlsx';



@Component({
    templateUrl: './agent.component.html'
    ,
    providers: [MessageService,AgentService,CurrencyService,CountryService,StaffService,DatePipe]
})
export class AgentComponent implements OnInit{


    countries: Country[] = [];

    currencies: Currency[] =[];

    listStaff: Staff[]=[];



    agentCountry: Country={};
    agentDefaultCurrency:Currency={};
    agentBillingCountry:Country={};
    agentShippingCountry:Country={};

    agent : Agent = {

    };
    agents : Agent[] =[];

    agentDialog: boolean = false;
    deleteAgentDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    Total_Agents : number =0;
    Total_Active_Agents : number =0;
    Total_Inactive_Agents : number =0;



    boolcommercial: boolean=false;

    ajouterOrEditValue!: boolean;
    agentStaff: Staff={};
    exclInactif:boolean=false;
    dropdownFocused: boolean=false;






    constructor(private agentService: AgentService, private messageService: MessageService, private countryService: CountryService, private currencyService: CurrencyService, private StaffService: StaffService) {


    }

    ngOnInit() {

        this.agentService.countAgents().subscribe({next: (data: number)=>{this.Total_Agents =data;}});
        this.agentService.countActiveAgents().subscribe({next: (data: number)=>{this.Total_Active_Agents =data;}});
        this.agentService.countInactiveAgents().subscribe({next: (data: number)=>{this.Total_Inactive_Agents =data;}});

        this.agentService.getAgents().subscribe({next: (data: Agent[])=>{this.agents=data;console.log(data);}});

        this.countryService.getAllCountries().subscribe({next:(data:Country[])=> {this.countries = data;console.log(data);}});

        this.currencyService.getAllCurrencies().subscribe({next:(data:Currency[])=> {this.currencies=data;console.log(data);}});

        this.StaffService.listStaff().subscribe({next:(data:Staff[])=> {this.listStaff=data;console.log(data);}});

    }

    ajouterOrEdit(){
        if(    this.ajouterOrEditValue){
            this.confirmAjouterAgent();
        }
        else {
            this.confirmEditAgent();
        }
    }
    ajouterAgent(){
        this.ajouterOrEditValue=true;
        this.boolcommercial=false;


        this.agent = {};
        this.submitted = false;
        this.agentDialog = true;

    }

    confirmAjouterAgent(){
        this.submitted=true;
        if (!this.agent.company || !this.agent.phoneNumber || !this.agent.email || !this.agent.cnss ||  !this.agent.address || !this.agent.city || !this.agentCountry.countryId || !this.agentDefaultCurrency.currencyId){}
        else {
            this.agent={ ...this.agent};
            this.agent.countryId=this.agentCountry.countryId;
            this.agent.defaultCurrencyId=this.agentDefaultCurrency.currencyId;
            this.agent.billingCountryId=this.agentBillingCountry.countryId;
            this.agent.shippingCountryId=this.agentShippingCountry.countryId;



            this.agentService.ajouterAgent(this.agent);
            this.agentDialog=false;

            this.Total_Agents++;
            this.Total_Active_Agents++;
            this.agent.active=true;
            this.agents.push(this.agent);

            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agent ajouté', life: 3000 });
        }
    }
    editAgent(agent: Agent) {
        this.ajouterOrEditValue=false;
        this.agent = { ...agent };
        this.agentDialog = true;

        this.boolcommercial=true;


    }
    confirmEditAgent(){
        this.submitted=true;
        if (!this.agent.company || !this.agent.phoneNumber || !this.agent.email || !this.agent.cnss ||  !this.agent.address || !this.agent.city || !this.agentCountry.countryId || !this.agentDefaultCurrency.currencyId){}
        else {
            this.agent = {...this.agent};
            this.agent.countryId = this.agentCountry.countryId;
            this.agent.defaultCurrencyId = this.agentDefaultCurrency.currencyId;
            this.agent.billingCountryId = this.agentBillingCountry.countryId;
            this.agent.shippingCountryId = this.agentShippingCountry.countryId;
            this.agent.staffId = this.agentStaff.staffId;
            this.agent.staffFullName = this.agentStaff.firstName + " " + this.agentStaff.lastName;

            if(this.agents.find((agent)=>{
                return ( this.agent.agentId==agent.agentId && this.agent.staffId==agent.staffId ) ;
            })){}
            else {
                const now= new Date();
                this.agent.dateAffectation=now.toISOString();
            }
            this.agentService.updateAgent(this.agent);
            this.agentDialog = false;




            const index = this.agents.findIndex(item => item.agentId === this.agent.agentId);


            this.agents[index] = this.agent;

            this.agents = [...this.agents];

            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Agent modifié', life: 3000});
        }
    }
    deleteAgent(agent: Agent) {
        this.deleteAgentDialog = true;
        this.agent = { ...agent };
    }

    confirmDelete() {
        this.deleteAgentDialog = false;

        this.agentService.deleteAgentById(this.agent.agentId!);
        this.agents = this.agents.filter(val => val.agentId !== this.agent.agentId);
        this.Total_Agents--;
        if(this.agent.active==true) this.Total_Active_Agents--;
        else this.Total_Inactive_Agents--;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agent supprimé', life: 3000 });
        this.agent = {};
    }

    hideDialog() {

        this.agentDialog = false;
        this.submitted = false;
        this.boolcommercial=false;

    }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    onAgentActiveChange(agent:Agent) {
        this.agentService.agentActiveChange(agent);
        if(agent.active==false){
            this.Total_Active_Agents--;
            this.Total_Inactive_Agents++;
        }
        else {
            this.Total_Active_Agents++;
            this.Total_Inactive_Agents--;
        }


    }


    makePhoneCall(phoneNumber: string) {
        window.location.href = `tel:${phoneNumber}`;
    }


    exportToExcel(): void {
        const columnsToExport = [
            { field: 'company', header: 'Societé' },
            {field:'staffFullName', header: 'Commercial'},
            { field: 'email', header: 'Email' },
            { field: 'phoneNumber', header: 'Tél' },
            {field:'active',header: 'Actif'},
            {field:'dateAffectation', header: 'Date d\'Affectation'}

        ];



        let filteredData = this.agents.filter((row: Agent) => (row.active === true || row.active === this.exclInactif ) ).map((row: Agent) => {
            const newRow: any = {};
            for (const column of columnsToExport) {
                newRow[column.header] = row[column.field as keyof Agent];
            }
            return newRow;
        });






        const headers = columnsToExport.map(column => column.header);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData, { header: headers });
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'liste-agents.xlsx';
        downloadLink.click();

    }

    protected readonly console = console;

}


