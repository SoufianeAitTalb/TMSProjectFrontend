import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { clientComponent } from './client.component';
import { ContactClientComponent } from './ContactClient/contact-client/contact-client.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: clientComponent },
		{ path: 'ContactClient/:clientId', component : ContactClientComponent}
		
	])],
	exports: [RouterModule]
})
export class clientRoutingModule { }
