import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../models/category';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
})
export class AddEditCategoryComponent {
  categoryName: string = '';
  isUpdatedPage: boolean = false;
  categoryId: any;
  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategory
  ) {}
  ngOnit() {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
