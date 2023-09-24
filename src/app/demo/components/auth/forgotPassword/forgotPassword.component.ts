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
    providers: [StaffService,MessageService]

})
export class ForgotPasswordComponent {
    showMessage:boolean=false;
    valCheck: string[] = ['remember'];
    email!:string;


    constructor(public layoutService: LayoutService,private messageService:MessageService,private staffService: StaffService,private router:Router) { }

    // onForgotPass() {
    //     if(this.email!=null)
    //     this.showMessage=true;
    //
    //
    // }
    passKey: any;
    resetCode = 'AKL187';
    changePassword:boolean=false;
    password: any;
    severityMessage: string='';
    textMessage: string='';




    onForgotPass() {
        this.staffService.doesUserExist(this.email).subscribe(
            (data)=>{
                if(data==true){
                    this.severityMessage="success";
                    this.textMessage= "La demande de réinitialisation du mot de passe a été envoyée avec succès, veuillez vérifier votre email";


                    this.showMessage=true;
                    // Generate your reset code here
                    this.staffService.setNewPassKey(this.email,this.resetCode).subscribe();
                    // Define the email parameters
                    const emailParams = {
                        to_email: this.email, // Replace with the recipient's email
                        reset_code: this.resetCode,
                        name:"Soufiane Ait Talb"
                    };

                    // Send the email using EmailJS
                    Email.send('service_polas0p', 'template_t8hkh8m', emailParams)
                        .then((response) => {
                            console.log('Email sent:', response);
                        })
                        .catch((error) => {
                            console.error('Error sending email:', error);
                        });
                }
                else{
             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email n\'existe pas', life: 3000 });


            }},
            (error)=>{
                throw error;
            }
        );



    }


    onVerifyKey() {
        if (this.passKey!='' && this.passKey!= null){
        if(this.passKey==this.resetCode){
            this.changePassword=true;
        }
        // this.severityMessage="error";
        // this.textMessage= "Le code est incorrect";
       else this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Le code est incorrect', life: 3000 });

        }

    }

    onChangePassword() {
        if(this.password!=null){
            this.staffService.changePassword(this.email,this.password).subscribe();


        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Votre mot de passe a été modifié avec succès', life: 3000 });
            setTimeout(() => {
                // Your code here
                this.router.navigate(["/auth/login"]);
            }, 2000);
        }
    }


}
