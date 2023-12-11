import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _httpClient: HttpClient) {}

  getCategories(data: any): Observable<any> {
    return this._httpClient.get('Category', { params: data });
  }
  addCategory(data: any): Observable<any> {
    return this._httpClient.post('Category', { name: data });
  }
  editCategory(id:number,data: any): Observable<any> {
    return this._httpClient.put(`Category/${id}`, data);
  }
  deleteCategory(id:number): Observable<any> {
    return this._httpClient.delete(`Category/${id}`);
  }
}
