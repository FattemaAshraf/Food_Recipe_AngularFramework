import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { IUsersAdmin, IUsersAdminTable } from '../models/users-admin';
import { UsersAdminService } from '../services/users-admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  searchValue: string = '';
  isCards:boolean= false;
  groupId:number =0;
  pageNumber: number = 1;
  pageSize: number = 5;
  pathHttps: string = 'https://upskilling-egypt.com:443/';
  tableResponse: IUsersAdminTable | undefined;
  tableData: IUsersAdmin[]  = [];
  constructor(
    private _usersAdmin: UsersAdminService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    let params = {}
    if(this.groupId==2 || this.groupId==1){
      params={
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        groups: this.groupId,
        userName: this.searchValue, //for pass value from ngmodel to keyup reflect to table data
      }
    }else{
      params={
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        userName: this.searchValue, //for pass value from ngmodel to keyup reflect to table data
      }
    }
    this._usersAdmin.getAllUsers(params).subscribe({
      next: (res:IUsersAdminTable) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
        let users = this.tableData?.length;
        if (users !== undefined) {
          localStorage.setItem('users', users.toLocaleString());
        } else {
          localStorage.setItem('users', '0');
        }
      },
    });
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize; //==> zero if you refresh and back
    this.getTableData();

  }

  openDeleteDialog(userData: any): void {
    console.log(userData);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: userData,
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        console.log(result.id);
        this.onDeleteUser(result.id);
      }
    });
  }

  onDeleteUser(id: number) {
    this._usersAdmin.deleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.toastr.success('deleted successfully', 'Done!');
        this.getTableData();
      },
    });

  }


}
