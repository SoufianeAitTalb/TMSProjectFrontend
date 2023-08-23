import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactClient } from '../api/ContactClient';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class ContactClientService {

    private contactsSubject = new BehaviorSubject<ContactClient[]>([]);
    constructor(private http:HttpClient) {}

    public getContactClient(id:bigint):Observable<ContactClient[]>{
      return this.http.get<ContactClient[]>(environment.backendHost+"/api/contacts-client/client/"+id+"/contacts");

    }

  public countContacts(): Observable<number>{
    return this.http.get<number>(environment.backendHost+"/api/contacts-client/Total-Contacts");
  }

  public countInactiveContacts(): Observable<number>{
      return this.http.get<number>(environment.backendHost+"/api/contacts-client/Total-Inactive-Contacts");
  }

  public countActiveContacts(): Observable<number>{
    return this.http.get<number>(environment.backendHost+"/api/contacts-client/Total-Active-Contacts");
  }

  public getContactPrincipalFullName(id: bigint):Observable<string>{
       return this.http.get<string>(environment.backendHost + "/api/contacts-client/contact-principal-fullname/" + id);
    
  }

  addNewContact(clientId: bigint,contactDto: ContactClient): Observable<string> {
    const url = environment.backendHost + `/api/contacts-client/client/${clientId}/contacts`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(url, contactDto, httpOptions)
      .pipe(
        map(response => {
          if (response) {
            if (response.status === 'success') {
              return 'Le contact a été ajouté avec succès';
            } else if (response.error === 'email_exists') {
              return 'Cet email est déjà utilisé';
            }
          } this.contactsSubject.next([...this.contactsSubject.value, contactDto]);

          return 'Une erreur s\'est produite lors de l\'ajout du contact';
        }),
        catchError(error => {
          console.log('Error', error);
          throw error;
        })
      );
    }
    
    updateClientContact(contactId: bigint, clientId: bigint, contactDto: ContactClient): Observable<any> {
      const url = `${environment.backendHost}/api/contacts-client/update-client-contact/${clientId}/${contactId}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    
      const convertedContactDto = { ...contactDto, clientId: clientId.toString(), contactId: contactId.toString() };
    
      return this.http.put<any>(url, convertedContactDto, httpOptions).pipe(
        tap(() => {
          const updatedClients = this.contactsSubject.value.map(contact => {
            if (contact.contactId === contactId) {
              return { ...contact, ...contactDto };
            }
            return contact;
          });
    
          this.contactsSubject.next(updatedClients);
        }),
        catchError(error => {
          console.log('Error updating contact:', error);
          throw error;
        })
      );
    }
    
    

    deleteContactOfClient(contactId: bigint): Observable<any> {
      const url = `${environment.backendHost}/api/contacts-client/delete-client-contact/${contactId}`;
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  
      return this.http.delete<string>(url, httpOptions)
        .pipe(
          catchError(error => {
            console.error('Error deleting contact of client:', error);
            return throwError('Une erreur s\'est produite lors de la suppression du contact');
          })
        );
    }

    updateContactActiveStatus(contactId: bigint, active: boolean): Observable<any> {
      const url = `${environment.backendHost}/api/contacts-client/update-client-contact/${contactId}/active`;
      const httpOptions = {
        params: { active: active.toString() } // Convert boolean to string
      };
    
      return this.http.put(url, null, httpOptions)
        .pipe(
          catchError(error => {
            console.log('Error updating contact:', error);
            throw error;
          })
        );
    }
}
