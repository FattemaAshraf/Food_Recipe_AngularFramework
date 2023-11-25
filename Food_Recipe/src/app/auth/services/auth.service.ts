import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ILogin } from 'src/app/models/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role:string | null='';

  constructor(private _httpClient: HttpClient) { }

  getProfile(){
    let encoded: any = localStorage.getItem('userToken');
    let decoded:any = jwtDecode(encoded);
    console.log(decoded.userName);
    console.log(decoded.userGroup);
    localStorage.setItem('role', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);
    this.getRole();
  }
getRole(){
if(localStorage.getItem('userToken') !== null && localStorage.getItem('role')){
this.role = localStorage.getItem('role');
}
}
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
