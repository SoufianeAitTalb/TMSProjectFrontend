import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {MessageService} from "primeng/api";
import {AgentService} from "../../../service/agent.service";
import {CurrencyService} from "../../../service/currency.service";
import {CountryService} from "../../../service/country.service";
import {StaffService} from "../../../service/staff.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import * as Email from 'emailjs-com';

@Component({
    selector: 'app-login',
    templateUrl: './forgotPassword.component.html',
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
export class ForgotPasswordComponent {
    showMessage:boolean=false;
    valCheck: string[] = ['remember'];
    email!:string;


    constructor(public layoutService: LayoutService,private staffService: StaffService,private router:Router) { }

    // onForgotPass() {
    //     if(this.email!=null)
    //     this.showMessage=true;
    //
    //
    // }
    passKey: any;
    resetCode = 'ABC123';
    changePassword:boolean=false;
    password: any;




    onForgotPass() {
        if(this.email!=null)
            this.showMessage=true;
         // Generate your reset code here
        this.staffService.setNewPassKey(this.email,this.resetCode).subscribe();
        // Define the email parameters
        const emailParams = {
            to_email: 'sf.aittalb@gmail.com', // Replace with the recipient's email
            reset_code: this.resetCode,
        };

        // Send the email using EmailJS
        // Email.send('service_polas0p', 'template_t8hkh8m', emailParams)
        //     .then((response) => {
        //         console.log('Email sent:', response);
        //     })
        //     .catch((error) => {
        //         console.error('Error sending email:', error);
        //     });
    }


    onVerifyKey() {
        if(this.passKey==this.resetCode){
            this.changePassword=true;
        }
    }

    onChangePassword() {
        if(this.password!=null){
            this.staffService.changePassword(this.email,this.password).subscribe();
            this.router.navigate(["/auth/login"]);
        }
    }
}
