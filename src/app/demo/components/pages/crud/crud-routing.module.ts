import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudComponent } from './crud.component';
import { ContactClientComponent } from './ContactClient/contact-client/contact-client.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudComponent },
		{ path: 'ContactClient/:clientId', component : ContactClientComponent}
		
	])],
	exports: [RouterModule]
})
export class CrudRoutingModule { }
