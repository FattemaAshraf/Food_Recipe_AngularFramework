import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  //used for user and admin
  constructor(private _httpClient: HttpClient) {}

  getTags(): Observable<any> {
    return this._httpClient.get('tag');
  }
}
