import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgotPassword.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ForgotPasswordComponent }
    ])],
    exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
