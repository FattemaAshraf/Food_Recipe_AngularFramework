import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from 'src/app/models/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _httpClient: HttpClient) { }

   onLogin(data :ILogin){
    return this._httpClient.post('Users/Login', data);
   }
   onRequestResetPassword(data : string){
    return this._httpClient.post('Users/Reset/Request', {email:data});
   }
   onResetPassword(data : string){
    return this._httpClient.post('Users/Reset', data);
   }
}
