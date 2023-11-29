
export interface ICategory {
  id:number,
  name:string,
  creationDate:string,
  modificationDate:string,
}

export interface ICategoryTable {
  pageNumber: number,
  pageSize: number,
  totalNumberOfRecorde: number,
  totalNumberOfPages:number,
  data: ICategory[]
}
