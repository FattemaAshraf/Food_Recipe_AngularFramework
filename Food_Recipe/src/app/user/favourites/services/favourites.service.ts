import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor(private _httpClient: HttpClient) {}

  getAllFavourites(): Observable<any> {
    return this._httpClient.get('userRecipe');
  }
  onAddToFavourite(id:number): Observable<any> {
    return this._httpClient.post('userRecipe', {recipeId:id});
  }
  onDeleteFavourite(data: any): Observable<any> {
    return this._httpClient.delete('userRecipe', data);
  }
}
