import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Staff } from '../api/Staff';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import {Collaborateurs} from "../api/main";
import {error} from "@angular/compiler-cli/src/transformers/util";




@Injectable()
export class StaffService {
    private apiUrl = 'http://localhost:8080/api/users/'
    private isAuthenticated = true;



    // login(email: string, password: string): any {
    //     this.http.post(this.apiUrl+'login',{"email":email,"password":password}).subscribe(
    //         (date)=>{
    //             console.log("post success");
    //             this.isAuthenticated = true;
    //             return true;
    //         },
    //     (error)=>{
    //         console.log("post error");
    //             console.log(error);
    //             this.isAuthenticated = false;
    //             return false;
    //     }
    //     )
    //     console.log("isAuthenticated: "+this.isAuthenticated);
    // }

    login(email:string,password:string){
        return this.http.post(this.apiUrl+'login',{"email":email,"password":password});
    }

    logout(): void {
        // Implement logout logic here, e.g., clearing user data, tokens, etc.
        this.isAuthenticated = false;
    }

    isLoggedIn(): boolean {
        // Return the authentication status
        return this.isAuthenticated;
    }
    constructor(private http: HttpClient) { }

    listStaff():Observable<Staff[]>{
        return this.http.get<Staff[]>(this.apiUrl);

    }
    setNewPassKey(email:string,newPassKey:string){
        return this.http.put(this.apiUrl+"set-new-pass-key",{"email":email,"newPassKey":newPassKey});
    }
    changePassword(email:string,password:string){
        return this.http.put(this.apiUrl+"change-password",{"email":email,"password":password});
    }

    getCollaborateurs(): Observable<Collaborateurs[]> {
        return this.http.get<Collaborateurs[]>(this.apiUrl);
    }

    deleteCollaborateur(id: number) {
        return this.http.delete<any>(this.apiUrl + 'delete-staff/' + id);
    }

    addCollaborateur(collaborateur: Collaborateurs){
        return this.http.post(this.apiUrl + 'add-staff', collaborateur);
    }

}
