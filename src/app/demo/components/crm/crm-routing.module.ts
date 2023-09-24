import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.clientModule) },
        { path: 'opportunity', loadChildren: () => import('./opportunity/opportunity.module').then(m => m.opportunityModule) },
        { path: 'agent', loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule) },
        { path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CrmRoutingModule { }
