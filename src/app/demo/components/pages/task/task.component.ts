import {Component, OnInit} from '@angular/core';

import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {CountryService} from 'src/app/demo/service/country.service';
import {AgentService} from 'src/app/demo/service/agent.service';
import {DatePipe} from '@angular/common';
import {Country} from 'src/app/demo/api/Country';
import {Currency} from 'src/app/demo/api/Currency';
import {CurrencyService} from 'src/app/demo/service/currency.service';
import {StaffService} from 'src/app/demo/service/staff.service';
import {Staff} from 'src/app/demo/api/Staff';
import {Agent} from "../../../api/Agent";
import {Task} from "../../../api/Task";

import * as XLSX from 'xlsx';
import {TaskService} from "../../../service/task.service";
import {TaskPriority} from "../../../api/enums/TaskPriority";
import {TaskRepeatEvery} from "../../../api/enums/TaskRepeatEvery";
import {TaskStatus} from "../../../api/enums/TaskStatus";
import {ClientService} from "../../../service/client.service";
import {Client} from "../../../api/Client";
import {Collaborator} from "../../../api/Collaborator";
import {switchAll} from "rxjs";


@Component({
    templateUrl: './task.component.html'
    ,
    providers: [MessageService,TaskService,AgentService,ClientService,CurrencyService,CountryService,StaffService,DatePipe]
})
export class TaskComponent implements OnInit{


    taskPriorityValues: string[] = Object.values(TaskPriority);
    taskRepeatEveryValues: string[] = Object.values(TaskRepeatEvery);
    linkToValues : string[]=['AGENT','CLIENT'];


    countries: Country[] = [];


    agent : Agent = {

    };
        client : Client = {

    };

        collaborator : Collaborator={};


    linkTo='';

    task : Task = {};
    tasks : Task[] =[];
    agents:Agent[]=[];
    // clients:Client[]=[];
    collaborators:Collaborator[]=[];

    taskDialog: boolean = false;
    deleteTaskDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    Total_Tasks : number =0;
    Total_Scheduled_Tasks : number =0;
    Total_Done_Tasks : number =0;
    Total_Canceled_Tasks : number =0;

    ajouterOrEditValue!: boolean;

    inclProg:boolean=false;







    constructor(private taskService: TaskService,private agentService: AgentService,private clientService: ClientService, private messageService: MessageService, private countryService: CountryService, private currencyService: CurrencyService, private StaffService: StaffService) {


    }

    ngOnInit() {

        this.taskService.countTasks().subscribe({next: (data: number)=>{this.Total_Tasks =data;}});
        this.taskService.countScheduledTasks().subscribe({next: (data: number)=>{this.Total_Scheduled_Tasks =data;}});
        this.taskService.countDoneTasks().subscribe({next: (data: number)=>{this.Total_Done_Tasks =data;}});
        this.taskService.countCanceledTasks().subscribe({next: (data: number)=>{this.Total_Canceled_Tasks =data;}});

        this.taskService.getTasks().subscribe({next: (data: Task[])=>{this.tasks=data;}});


    }

    ajouterOrEdit(){
        if(    this.ajouterOrEditValue){
            this.confirmAjouterTache();
        }
        else {
            this.confirmEditTask();
        }
    }
    ajouterTache(){
        this.ajouterOrEditValue=true;
        this.task = {};
        this.submitted = false;
        this.taskDialog = true;

    }

    confirmAjouterTache(){
        this.submitted=true;
        if (!this.task.dueDate || !this.task.priority || !this.task.repeatEvery || !this.task.taskDetails ||  !this.task.planNextAction ){}
        else {
            this.task={ ...this.task};
            if(this.linkTo=='AGENT') this.task.agentId=this.collaborator.agentId;
            else if (this.linkTo=='CLIENT') this.task.clientId=this.collaborator.clientId;

            this.taskService.addTask(this.task);
            this.taskDialog=false;
            this.task.status=TaskStatus.Scheduled;
            this.tasks.push(this.task);

            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tâche ajoutée', life: 3000 });
            this.task={};
        }
    }
    editTask(task: Task) {
        this.ajouterOrEditValue=false;
        this.task = { ...task };
        this.taskDialog = true;
    }
    confirmEditTask(){
        this.submitted=true;
        if (!this.task.dueDate || !this.task.priority || !this.task.repeatEvery || !this.task.taskDetails ||  !this.task.planNextAction ){}
        else {
            this.task={ ...this.task};
            if(this.linkTo=='AGENT') this.task.agentId=this.collaborator.agentId;
            else if (this.linkTo=='CLIENT') this.task.clientId=this.collaborator.clientId;

            this.taskService.updateTask(this.task);
            this.taskDialog = false;

            const index = this.tasks.findIndex(item => item.taskId === this.task.taskId);


            this.tasks[index] = this.task;

            this.tasks = [...this.tasks];

            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Tâche modifiée', life: 3000});
        }
    }
    deleteTask(task: Task) {
        this.deleteTaskDialog = true;
        this.task = { ...task };
    }

    confirmDelete() {
        this.deleteTaskDialog = false;

        this.taskService.deleteTaskById(this.task.taskId!);
        this.tasks = this.tasks.filter(val => val.taskId !== this.task.taskId);

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tâche supprimée', life: 3000 });
        this.task = {};
    }

    hideDialog() {

        this.taskDialog = false;
        this.submitted = false;


    }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }




    exportToExcel(): void {
        const columnsToExport = [
            { field: 'name', header: 'Nom' },
            {field:'status', header: 'Status'},
            { field: 'dueDate', header: 'Date d\'échéance' },
            { field: 'priority', header: 'Priorité' }

        ];
        let filterByCondition;
        if(this.inclProg)
        filterByCondition = this.tasks.filter((row: Task) => (row.status === TaskStatus.Scheduled ) );
        else filterByCondition=this.tasks;

        let filteredColumns = filterByCondition.map((row: Task) => {
            const newRow: any = {};
            for (const column of columnsToExport) {
                newRow[column.header] = row[column.field as keyof Task];
            }
            return newRow;
        });

        const headers = columnsToExport.map(column => column.header);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredColumns, { header: headers });
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'liste-tasks.xlsx';
        downloadLink.click();

    }

    protected readonly console = console;




    getPriorityStyle(priority : TaskPriority) {
       switch (priority) {
           case TaskPriority.Important : return  {backgroundColor:'var(--red-50)', color: 'var(--red-600)' ,fontWeight: '500', borderRadius: '0.6rem', padding: '0.4rem 0.8rem'};
           case TaskPriority.High : return  {backgroundColor:'var(--yellow-50)', color: 'var(--yellow-600)',fontWeight: '500', borderRadius: '0.6rem', padding: '0.4rem 0.8rem'};
           case TaskPriority.Medium : return {backgroundColor:'var(--blue-50)', color: 'var(--blue-600)',fontWeight: '500', borderRadius: '0.6rem', padding: '0.4rem 0.8rem'};
           case TaskPriority.Low : return {backgroundColor:'var(--green-50)', color: 'var(--green-600)',fontWeight: '500', borderRadius: '0.6rem', padding: '0.4rem 0.8rem'};
           default : return {};
       }
    }


    getStatusStyle(status: TaskStatus) {
        switch (status) {
            case TaskStatus.Scheduled  : return  {backgroundColor:'var(--gray-50)', color: 'var(--gray-600)',fontWeight: '500', borderRadius: '0.6rem', padding: '0.4rem 0.8rem'};
            case TaskStatus.Done : return  {backgroundColor:'var(--green-50)', color: 'var(--green-600)' ,fontWeight: '500', borderRadius: '0.6rem', padding: '0.4rem 0.8rem'};
            case TaskStatus.Canceled : return  {backgroundColor:'var(--red-50)', color: 'var(--red-600)' ,fontWeight: '500', borderRadius: '0.6rem', padding: '0.4rem 0.8rem'};

            default : return {};
        }
    }






    onModelChange($event: any) {

        if(this.linkTo==='AGENT'){
            this.agentService.getAgents().subscribe({next: (data: Agent[])=>{this.collaborators=data}});
        }
        else if(this.linkTo==='CLIENT'){
            this.clientService.getClients().subscribe({next: (data: Client[])=>{this.collaborators=data}});
        }

    }
}


