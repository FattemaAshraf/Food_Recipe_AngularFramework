import { IRecipe } from 'src/app/admin/recipes/models/recipe';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent {
  pathHttps: string = 'https://upskilling-egypt.com:443/';
  constructor(
    public dialogRef: MatDialogRef<RecipeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRecipe
  ) {}
  ngOnit(){
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
