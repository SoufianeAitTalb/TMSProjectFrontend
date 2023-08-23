import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../api/Client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class ClientService {

  private clientsSubject = new BehaviorSubject<Client[]>([]);
  clients$: Observable<Client[]> = this.clientsSubject.asObservable();
    num=0;

    constructor(private http:HttpClient) {}
    

    public countClients(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/clients/Total-Clients");
    }

    public countInactiveClients(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/clients/Total-Inactive-Clients");
    }

    public countActiveClients(): Observable<number>{
        return this.http.get<number>(environment.backendHost+"/api/clients/Total-Active-Clients");
    }


    public getClients():Observable<Client[]>{
      return this.http.get<Client[]>(environment.backendHost+"/api/clients/dto/");
   }

    deleteClientById(id: bigint):Observable<any> {
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
      const url = `${environment.backendHost}/api/clients/delete-client/${id}`;
       
       return this.http.delete<string>(url, httpOptions)
       .pipe(
         catchError(error => {
           console.error('Error deleting client of client:', error);
           return throwError('Une erreur s\'est produite lors de la suppression du contact');
         })
       );
    }
    



    addNewClient(clientDto: Client): Observable<string> {
      const url = environment.backendHost + '/api/clients/add-client';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

    
      return this.http.post<any>(url, clientDto, httpOptions)
        .pipe(
          map(response => {
            if (response) {
              if (response.status === 'success') {
                return 'Le client a été ajouté avec succès';
              } else if (response.error === 'email_exists') {
                return 'Cet email est déjà utilisé';
              }
            } this.clientsSubject.next([...this.clientsSubject.value, clientDto]);

            return 'Une erreur s\'est produite lors de l\'ajout du client';
          }),
          catchError(error => {
            console.log('Error', error);
            throw error;
          })
        );
    }

 

    updateClient(id: bigint, clientDto: Client): Observable<any> {
      const url = `${environment.backendHost}/api/clients/update-client/${id}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      
      return this.http.post<any>(url, clientDto, httpOptions).pipe(
        tap(() => {
          
          const updatedClients = this.clientsSubject.value.map(client => {
            if (client.clientId === id) {
              return { ...client, ...clientDto }; 
            }
            return client;
          });
    
          this.clientsSubject.next(updatedClients);
        }),
        catchError(error => {
          console.log('Error updating client:', error);
          throw error;
        })
      );
    }

    affectCommercialToClient(clientId: bigint, staffId: bigint): Observable<string> {
      const url = `${environment.backendHost}/api/clients/update-client/${clientId}/affect-commercial/${staffId}`;
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

      return this.http.put<string>(url, {}, httpOptions).pipe(catchError(
        error => {console.error('Error affecting commercial to client:', error);
          return throwError('Une erreur s\'est produite lors de l\'affectation du commercial au client');
        }
      ));
    }
  
    deleteCommercialOfClient(clientId: bigint): Observable<string> {
      const url = `${environment.backendHost}/api/clients/update-client/${clientId}/delete-commercial`;
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  
      return this.http.delete<string>(url, httpOptions)
        .pipe(
          catchError(error => {
            console.error('Error deleting commercial of client:', error);
            return throwError('Une erreur s\'est produite lors de la suppression du commercial');
          })
        );
    }
      
        
}
