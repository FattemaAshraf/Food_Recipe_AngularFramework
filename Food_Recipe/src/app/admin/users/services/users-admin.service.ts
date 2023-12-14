import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService {

  constructor(private _httpClient: HttpClient) { }
  getAllUsers(data:any):Observable<any>{
    return this._httpClient.get('Users',{params: data});
  }

  getUserById(id: number):Observable<any>{
    return this._httpClient.get(`Users/${id}`);
  }

  deleteUser(id:number): Observable<any> {
    return this._httpClient.delete(`Users/${id}`);
  }

}
