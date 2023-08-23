import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Staff } from '../api/Staff';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';




@Injectable()
export class StaffService {

    constructor(private http: HttpClient) { }

    listStaff():Observable<Staff[]>{
        return this.http.get<Staff[]>(environment.backendHost+"/api/users/");

    }
}
