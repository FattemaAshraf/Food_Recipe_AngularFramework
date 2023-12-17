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
  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategory
  ) {
    if (data.id != null) {
      this.categoryName = data.name;
      this.isUpdatedPage = true;
      console.log(data)
    } else {
      this.isUpdatedPage = false;
      console.log(data)
    }

  }
  ngOnit() {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
