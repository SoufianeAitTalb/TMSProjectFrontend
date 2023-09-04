import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {MessageService} from "primeng/api";
import {AgentService} from "../../../service/agent.service";
import {CurrencyService} from "../../../service/currency.service";
import {CountryService} from "../../../service/country.service";
import {StaffService} from "../../../service/staff.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [StaffService]

})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    email!:string;
    password!: string;

    constructor(public layoutService: LayoutService,private staffService: StaffService,private router:Router) { }

    onLogin() {
        this.staffService.login(this.email,this.password).subscribe(

            (data: any) => {
                console.log('Data received:', data.status);
                this.router.navigate(["/pages/client"]);

            },
            (error: any) => {
                // This function is called if there is an error.
                console.error('Error:', error.error);
                throw error;
            }

        )
    }
}
