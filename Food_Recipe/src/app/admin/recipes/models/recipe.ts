
export interface IRecipe {
  id:number,
  name:string,
  creationDate:string,
  modificationDate:string,
  imagePath: string,
  description: string,
  price: number,
  category: [],
  tag: ITag
}

export interface IRecipeTable {
  pageNumber: number,
  pageSize: number,
  totalNumberOfRecords: number,
  totalNumberOfPages:number,
  data: IRecipe[]
}

export interface ITag {
  id:number,
  name:string,
  creationDate:string,
  modificationDate:string,
}

