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
  addRecipe(data: any): Observable<any> {
    return this._httpClient.post('Recipe', { name: data });
  }

  deleteRecipe(id:number): Observable<any> {
    return this._httpClient.delete(`Recipe/${id}`);
  }
}
