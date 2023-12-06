import { IRecipe } from "src/app/admin/recipes/models/recipe";

export interface IFavouriteTable {
  pageNumber: number;
  pageSize: number;
  data: IFavourite[];
}
export interface IFavourite {
  id: number,
  creationDate: string,
  modificationDate: string,
  recipe: IRecipe
}
