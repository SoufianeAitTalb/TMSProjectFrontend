import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../api/Currency';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';



@Injectable()
export class CurrencyService {

    constructor(private http: HttpClient) { }

    getAllCurrencies():Observable<Currency[]>{
        return this.http.get<Currency[]>(environment.backendHost+"/api/currencies/");

    }
}
