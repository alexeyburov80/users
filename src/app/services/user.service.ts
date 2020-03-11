import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import httpconfig from '../../assets/config.json';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<any> {
    console.log('assets/config.json: ', httpconfig);
    return this.http.get(httpconfig.server, {
      observe: 'body',
      responseType: 'json'
    });
  }
}
