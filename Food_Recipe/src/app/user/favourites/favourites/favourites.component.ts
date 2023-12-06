import { Component } from '@angular/core';
import { FavouritesService } from '../services/favourites.service';
import { IFavourite, IFavouriteTable } from '../models/ifavourite';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
  searchValue: string = '';
  pageNumber: number = 1;
  pageSize: number = 5;
  tableResponse: IFavouriteTable | undefined;
  tableData: IFavourite[] = [];
  pathHttps: string = 'https://upskilling-egypt.com:443/';

  constructor(private _favService: FavouritesService,
    public dialog: MatDialog,
    private toastr: ToastrService) {}
  ngOnInit() {
    this.getAllFavourites();
  }
  getAllFavourites() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue,
    };
    this._favService.getAllFavourites(params).subscribe({
      next: (res: IFavouriteTable) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
        console.log(this.tableData);
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {},
    });
  }
  openDeleteDialog(data: any): void {
    console.log(data);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: data,
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        console.log(result.id);
        this.onDeleteFav(result.id);
      }
    });
  }

  onDeleteFav(id: number) {
    this._favService.onDeleteFavourite(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.toastr.success('Done!');
        this.getAllFavourites();
      },
    });
  }
}
