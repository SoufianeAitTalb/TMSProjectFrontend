import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent.component';
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
import { AgentService } from 'src/app/demo/service/agent.service';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import {CheckboxModule} from "primeng/checkbox";
import {StyleClassModule} from "primeng/styleclass";

@NgModule({
    imports: [
        CommonModule,
        AgentRoutingModule,
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
        InputSwitchModule,
        CheckboxModule,
        StyleClassModule
    ],
    declarations: [AgentComponent],
    providers:[AgentService]
})
export class AgentModule { }
