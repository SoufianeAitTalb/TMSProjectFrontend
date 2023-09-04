// import { NgModule } from '@angular/core';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
// import { AppLayoutModule } from './layout/app.layout.module';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
// import { ProductService } from './demo/service/product.service';
// import { CountryService } from './demo/service/country.service';
// import { CustomerService } from './demo/service/customer.service';
// import { EventService } from './demo/service/event.service';
// import { IconService } from './demo/service/icon.service';
// import { NodeService } from './demo/service/node.service';
// import { PhotoService } from './demo/service/photo.service';
//
//
// @NgModule({
//     declarations: [
//         AppComponent, NotfoundComponent
//     ],
//     imports: [
//         AppRoutingModule,
//         AppLayoutModule
//     ],
//     providers: [
//         { provide: LocationStrategy, useClass: HashLocationStrategy },
//         CountryService, CustomerService, EventService, IconService, NodeService,
//         PhotoService, ProductService
//     ],
//     bootstrap: [AppComponent]
// })
// export class AppModule { }


import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy, NgClass, NgForOf, NgIf} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import {
    AjouterCollaborateurComponent
} from "./demo/components/parametre/ajouter-collaborateur/ajouter-collaborateur.component";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TableModule} from "primeng/table";
import {RoleComponent} from "./demo/components/parametre/role/role.component";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {RatingModule} from "primeng/rating";
import { DemandeComponent } from './demo/components/tarification/demande/demande.component';
import { TarifComponent } from './demo/components/tarification/tarif/tarif.component';
import { OffresComponent } from './demo/components/tarification/offres/offres.component';
import { CreerDemandeComponent } from './demo/components/tarification/creer-demande/creer-demande.component';
import {ChartModule} from "primeng/chart";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ListboxModule} from "primeng/listbox";
import {MultiSelectModule} from "primeng/multiselect";
import {RadioButtonModule} from "primeng/radiobutton";
import {StaffService} from "./demo/service/staff.service";
import {CountryService} from "./demo/service/country.service";


@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        AjouterCollaborateurComponent,
        RoleComponent,
        DemandeComponent,
        TarifComponent,
        OffresComponent,
        CreerDemandeComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        NgClass,
        ButtonModule,
        RippleModule,
        FormsModule,
        NgIf,
        InputTextModule,
        AutoCompleteModule,
        TableModule,
        NgForOf,
        DataViewModule,
        DropdownModule,
        RatingModule,
        ReactiveFormsModule,
        ChartModule,
        InputTextareaModule,
        ListboxModule,
        MultiSelectModule,
        RadioButtonModule,

    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        StaffService,CountryService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
