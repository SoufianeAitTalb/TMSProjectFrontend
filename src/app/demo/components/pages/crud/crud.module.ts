import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from "primeng/autocomplete";
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ClientService } from 'src/app/demo/service/client.service';
import { TabViewModule } from 'primeng/tabview';
import { ContactClientComponent } from './ContactClient/contact-client/contact-client.component';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
    imports: [
        CommonModule,
        CrudRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        SelectButtonModule,
        AutoCompleteModule,
        HttpClientModule,
        TabViewModule,
        InputSwitchModule
    ],
    declarations: [CrudComponent, ContactClientComponent],
    providers:[ClientService]
})
export class CrudModule { }
