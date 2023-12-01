import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ITag } from '../../models/recipe';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeService } from '../../services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/admin/categories/models/category';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent {
  tags: ITag[] = [];
  categories: ICategory[] = [];
  recipeForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(null),
  });
  constructor(
    private _helperService: HelperService,
    private toastr: ToastrService,
    private _recipeService: RecipeService
  ) {}
  ngOnInit() {
    this.getAllTags();
    this.getAllCategories();
  }
  onSubmit(data: FormGroup) {
    console.log(data.value);
  }
  getAllTags() {
    this._helperService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.tags = res;
      },
    });
  }
  getAllCategories(){
    this._helperService.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories=res.data;
      }
    })
  }
}
