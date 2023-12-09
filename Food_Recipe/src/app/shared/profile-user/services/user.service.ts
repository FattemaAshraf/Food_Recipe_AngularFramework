import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this._httpClient.get('Users/currentUser');
  }
  updateCurrentProfile(data:any):Observable<any>{
    return this._httpClient.put('Users',data);
  }
}
