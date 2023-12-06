import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor(private _httpClient: HttpClient) {}

  getAllFavourites(data: any): Observable<any> {
    return this._httpClient.get('userRecipe',{ params: data });
  }
  onAddToFavourite(id:number): Observable<any> {
    return this._httpClient.post('userRecipe', {recipeId:id});
  }
  onDeleteFavourite(id:number): Observable<any> {
    return this._httpClient.delete(`userRecipe/${id}`);
  }
}
