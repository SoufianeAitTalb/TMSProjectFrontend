import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'CRM',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {
                        label: 'Client',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/crm/client']
                    },
                    {
                        label: 'Agent',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/crm/agent']
                    },

                    {
                        label: 'Tâche',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/crm/task']
                    },
                    {
                        label: 'Opportunité',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/crm/opportunity']
                    },
                ]
            },
            {
                label: 'Parametre',
                items: [
                    { label: 'Collaborateurs', icon: 'pi pi-fw pi-home', routerLink: ['/parametre/collaborateur'] },
                    { label: 'Role', icon: 'pi pi-fw pi-home', routerLink: ['/parametre/role'] }
                ]
            },
            {
                label: 'Tarification',
                items: [
                    { label: 'Demandes ', icon: 'pi pi-fw pi-home', routerLink: ['/tarification/demande'] },
                    { label: 'Tarifs', icon: 'pi pi-fw pi-home', routerLink: ['/tarification/tarif'] },
                    { label: 'Offres', icon: 'pi pi-fw pi-home', routerLink: ['/tarification/offre'] }
                ]
            },

        ];
    }
}
