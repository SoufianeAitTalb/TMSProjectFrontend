import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {MessageService} from "primeng/api";
import {StaffService} from "../../../service/staff.service";
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
    providers: [StaffService,MessageService]

})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    email!:string;
    password!: string;
    incorrect: boolean=false;

    constructor(public layoutService: LayoutService,private staffService: StaffService,private router:Router,private messageService : MessageService) { }

    onLogin() {

        if(this.email!=null && this.password!=null) {
            this.incorrect = false;
            this.staffService.login(this.email, this.password).subscribe(
                (data: any) => {

                    this.router.navigate(["/crm/client"]);

                },
                (error: any) => {
                    // This function is called if there is an error.
                    this.incorrect = true;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou Mot de passe incorrect', life: 3000 });
                    throw error;
                }
            )
        }
    }
}
