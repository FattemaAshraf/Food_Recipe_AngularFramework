import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ICategory, ICategoryTable } from '../models/category';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 5;
  tableResponse: ICategoryTable | undefined;
  tableData: ICategory[] | undefined = [];
  constructor(private _categoryService: CategoryService) {}
  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    this._categoryService.getCategories(params).subscribe({
      next: (res) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
      },
    });
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageNumber= e.pageIndex;
    this.pageSize = e.pageSize; //==> zero if you refresh and back
    //this.pageNumber = this.tableResponse?.pageNumber; => to back or refresh at same page
    this.getTableData();
    // this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex;
  }
}
