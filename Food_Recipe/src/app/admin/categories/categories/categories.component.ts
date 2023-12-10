import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ICategory, ICategoryTable } from '../models/category';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from '../components/add-edit-category/add-edit-category.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  searchValue: string = '';
  pageNumber: number = 1;
  pageSize: number = 5;
  tableResponse: ICategoryTable | undefined;
  tableData: ICategory[] | undefined = [];
  message: string | undefined;
  constructor(
    private _categoryService: CategoryService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue, //for pass value from ngmodel to keyup reflect to table data
    };
    this._categoryService.getCategories(params).subscribe({
      next: (res) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;

      },error: ()=>{

      },complete:()=>{
        let categories =this.tableData?.length;
        if (categories !== undefined) {
          localStorage.setItem('categories', categories.toLocaleString());
        } else {
          localStorage.setItem('categories', '0');
        }
      }
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
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {},
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.onAddNewCategory(result);
      }
    });
  }
  onAddNewCategory(data: string) {
    this._categoryService.addCategory(data).subscribe({
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
        this.onDeleteCategory(result.id);
      }
    });
  }

  onDeleteCategory(id: number) {
    this._categoryService.deleteCategory(id).subscribe({
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
}
