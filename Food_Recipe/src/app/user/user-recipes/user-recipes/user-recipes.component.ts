import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import {
  IRecipe,
  IRecipeTable,
  ITag,
} from 'src/app/admin/recipes/models/recipe';
import { RecipeService } from 'src/app/admin/recipes/services/recipe.service';
import { HelperService } from 'src/app/services/helper.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { RecipeDetailsComponent } from '../components/recipe-details/recipe-details.component';
import { Router } from '@angular/router';
import { FavouritesService } from '../../favourites/services/favourites.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss'],
})
export class UserRecipesComponent {
  searchValue: string = '';
  pageNumber: number = 1;
  pageSize: number = 5;
  tableResponse: IRecipeTable | undefined;
  tableData: IRecipe[] = [];
  message: string | undefined;
  tags: ITag[] = [];
  tagId: any;
  pathHttps: string = 'https://upskilling-egypt.com:443/';
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _recipeService: RecipeService,
    private _router: Router,
    private _helperService: HelperService,
    private _favService: FavouritesService
  ) {}
  ngOnInit() {
    this.getTableData();
    this.getAllTags();
  }

  getTableData() {
    let params={}
    if(this.tagId>=1){
      params = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        tagId: this.tagId,
        name: this.searchValue, //for pass value from ngmodel to keyup reflect to table data
      };
    }else{
      params = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        name: this.searchValue, //for pass value from ngmodel to keyup reflect to table data
      };
    }


    this._recipeService.getRecipes(params).subscribe({
      next: (res: IRecipeTable) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
        console.log(this.tableData?.length);
        let userRecipes = this.tableData?.length;
        if (userRecipes !== undefined) {
          localStorage.setItem('userRecipes', userRecipes.toLocaleString());
        } else {
          localStorage.setItem('userRecipes', '0');
        }

      },
    });
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize; //==> zero if you refresh and back
    //this.pageNumber = this.tableResponse?.pageNumber; => to back or refresh at same page
    this.getTableData();
    // this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex;
  }
  //   search(term: string) {
  // console.log(term); ==> in html by every keyup
  //                    ==>loading on dattabase|requests  (keyup)="getTableData()"
  //     } //for keayup work

  onAddNewRecipe(data: string) {
    this._recipeService.addRecipe(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.toastr.success(this.message, 'Done!');
        this.getTableData(); //updaated data in table
      },
    });
  }
  openDeleteDialog(categoryData: any): void {
    console.log(categoryData);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: categoryData,
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        console.log(result.id);
        this.onDeleteRecipe(result.id);
      }
    });
  }

  onDeleteRecipe(id: number) {
    this._recipeService.deleteRecipe(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.toastr.success(this.message, 'Done!');
        this.getTableData();
      },
    });
  }
  getAllTags() {
    this._helperService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.tags = res;
      },
    });
  }
  openDialog(recipeItem: IRecipe): void {
    const dialogRef = this.dialog.open(RecipeDetailsComponent, {
      data: recipeItem,
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      this.addToFavourite(result);
    });
  }
  addToFavourite(id: number) {
    this._favService.onAddToFavourite(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        this.toastr.success('added to favourites', 'Done!');
      },
    });
  }
}
