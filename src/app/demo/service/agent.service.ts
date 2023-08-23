import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../api/Agent';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class AgentService {
    num=0;

    constructor(private http:HttpClient) {}


    public countAgents(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/agents/Total-Agents");
    }

    public countInactiveAgents(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/agents/Total-Inactive-Agents");
    }

    public countActiveAgents(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/agents/Total-Active-Agents");
    }


    public getAgents():Observable<Agent[]>{
      return this.http.get<Agent[]>(environment.backendHost+"/api/agents/dto/");
   }


    ajouterAgent(agent:Agent){
        this.http.post(environment.backendHost+"/api/agents/add-agent",agent).subscribe();
    }
    updateAgent(agent:Agent){
        console.log({...agent});
        this.http.put( environment.backendHost+"/api/agents/update-agent/"+agent.agentId,{...agent}).subscribe();

    }
    deleteAgentById(id: bigint) {

       this.http.delete(environment.backendHost+"/api/agents/delete-agent/"+id).subscribe();
    }

    agentActiveChange(agent: Agent) {
        this.http.put( environment.backendHost+"/api/agents/" + agent.agentId+"/active?active="+ agent.active,null).subscribe();
    }
}
