import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {
    AjouterCollaborateurComponent
} from "./demo/components/parametre/ajouter-collaborateur/ajouter-collaborateur.component";
import {CreerDemandeComponent} from "./demo/components/tarification/creer-demande/creer-demande.component";
import {RoleComponent} from "./demo/components/parametre/role/role.component";
import {DemandeComponent} from "./demo/components/tarification/demande/demande.component";
import {TarifComponent} from "./demo/components/tarification/tarif/tarif.component";
import {OffresComponent} from "./demo/components/tarification/offres/offres.component";
import {AuthGuard} from "./guards/auth/authentication/authentication.guard";


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'tarification/demande', component:DemandeComponent, },
                    { path: 'tarification/demande/creerDemande', component: CreerDemandeComponent },
                    { path: 'tarification/tarif', component:TarifComponent, },
                    { path: 'tarification/offre', component:OffresComponent, },
                    { path: '', redirectTo: '/auth/login',
                    pathMatch: 'full' },
                    { path: 'pages', loadChildren: () => import('./demo/components/crm/pages.module').then(m => m.PagesModule) },
                    { path: 'parametre/collaborateur', component: AjouterCollaborateurComponent },
                    { path: 'parametre/role', component: RoleComponent },
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
