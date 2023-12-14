import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersAdminService } from '../../services/users-admin.service';
import { IUsersAdmin } from '../../models/users-admin';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent {
  userData: IUsersAdmin | undefined;
  imgSrc: any;
  pathHttps: string = 'https://upskilling-egypt.com:443/';
  userId: any;
  isViewPage: boolean=false;
  userForm = new FormGroup({
    id: new FormControl(),
    userName: new FormControl(),
    email: new FormControl(),
    country: new FormControl(),
    phoneNumber: new FormControl(),
    imagePath: new FormControl(null),
    role: new FormControl(),
    joinDate: new FormControl(),
    modificationDate: new FormControl(),
  });
  constructor(
    private toastr: ToastrService,
    private _router: Router,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _usersAdmin: UsersAdminService,
  ) {
    this.userId = _activatedRoute.snapshot.params['id'];
    if (this.userId) {
      this.isViewPage = true;
      this.getUserById(this.userId)
    }else{
      this.isViewPage = false;
    }

    this._activatedRoute.url.subscribe(url => {
      this.isViewPage = url.some(segment => segment.path === 'view');
      console.log(this.isViewPage);
      this.disableFormControls();
    });
  }
  ngOnInit() {
    this.getUserById(this.userId)
  }
  // onSubmit(data: FormGroup) {
  //   console.log(data.value);
  //   let myData = new FormData();
  //   myData.append('name', data.value.name);
  //   myData.append('price', data.value.price);
  //   myData.append('description', data.value.description);
  //   myData.append('categoriesIds', data.value.categoriesIds);
  //   myData.append('tagId', data.value.tagId);
  //   myData.append('recipeImage', this.imgSrc, this.imgSrc.name);
  // }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  getUserById(id: number) {
    this._usersAdmin.getUserById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.userData = res;
      },
      error: (err) => {
      },
      complete: () => {
          this.imgSrc = this.pathHttps+this.userData?.imagePath;
          this.userForm.patchValue({
          userName: this.userData?.userName,
          email: this.userData?.email,
          country: this.userData?.country,
          phoneNumber: this.userData?.phoneNumber,
          role: this.userData?.group.name,
          joinDate: this.userData?.creationDate,
          modificationDate: this.userData?.modificationDate
        })
      }
    });
  }
  disableFormControls() {
    if (this.isViewPage) {
      this.userForm.get('userName')?.disable();
      this.userForm.get('email')?.disable();
      this.userForm.get('country')?.disable();
      this.userForm.get('phoneNumber')?.disable();
      this.userForm.get('role')?.disable();
      this.userForm.get('joinDate')?.disable();
      this.userForm.get('modificationDate')?.disable();

    }
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
        this._router.navigate(['/dashboard/admin/users'])
      },
    });

  }
}
