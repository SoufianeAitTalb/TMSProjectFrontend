import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../api/Country';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class CountryService {

    constructor(private http: HttpClient) { }

    getCountries() {
        return this.http.get<any>('assets/demo/data/countries.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

    getAllCountries():Observable<Country[]>{
        return this.http.get<Country[]>(environment.backendHost+"/api/countries/");

    }
}
