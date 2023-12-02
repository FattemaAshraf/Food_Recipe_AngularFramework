import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _httpClient: HttpClient) { }
  getRecipes(data: any): Observable<any> {
    return this._httpClient.get('Recipe', { params: data });
  }
  getRecipeById(id:number): Observable<any> {
    return this._httpClient.get(`Recipe/${id}`);
  }
  addRecipe(data: any): Observable<any> {
    return this._httpClient.post('Recipe', data);
  }
  editRecipe(id:number,data: any): Observable<any> {
    return this._httpClient.put(`Recipe/${id}`, data);
  }
  deleteRecipe(id:number): Observable<any> {
    return this._httpClient.delete(`Recipe/${id}`);
  }
}
