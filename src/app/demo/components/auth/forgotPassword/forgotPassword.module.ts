import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgotPassword-routing.module';
import { ForgotPasswordComponent } from './forgotPassword.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {MessageModule} from "primeng/message";
import * as Email from 'emailjs-com'; // Import EmailJS library

// Configure EmailJS
Email.init('XffNj8vomoW1PF0hz'); // Replace with your EmailJS user ID

@NgModule({
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        MessageModule
    ],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
