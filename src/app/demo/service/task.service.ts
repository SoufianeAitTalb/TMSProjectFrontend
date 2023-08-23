import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Task } from '../api/Task';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class TaskService {
    num=0;

    constructor(private http:HttpClient) {}


    public countTasks(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/tasks/Total-Tasks");
    }

    public countScheduledTasks(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/tasks/Total-Scheduled-Tasks");
    }

    public countDoneTasks(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/tasks/Total-Done-Tasks");
    }

    public countCanceledTasks(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/tasks/Total-Canceled-Tasks");
    }


    public getTasks():Observable<Task[]>{
      return this.http.get<Task[]>(environment.backendHost+"/api/tasks/dto/");
   }


    addTask(task:Task){
        this.http.post(environment.backendHost+"/api/tasks/add-task",task).subscribe();
    }
    updateTask(task:Task){
        this.http.put( environment.backendHost+"/api/tasks/update-task/"+task.taskId,{...task}).subscribe();

    }
    deleteTaskById(id: bigint) {

       this.http.delete(environment.backendHost+"/api/tasks/delete-task/"+id).subscribe();
    }

    taskStatusChange(task: Task) {
        this.http.put( environment.backendHost+"/api/tasks/" + task.taskId+"/status?status="+ task.status,null).subscribe();
    }
}
