import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ITag } from '../../models/recipe';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeService } from '../../services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/admin/categories/models/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss'],
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
  message: string | undefined;
  imgSrc: any;
  isUpdatedPage: boolean = false;
  recipeData: any;
  recipeId: any;
  constructor(
    private _helperService: HelperService,
    private toastr: ToastrService,
    private _recipeService: RecipeService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    // this.recipeId = _activatedRoute.snapshot.params['id'];
    // if (this.recipeId) {
    //   this.isUpdatedPage = true;
    //   this.getRecipeById(this.recipeId)
    // }else{
    //   this.isUpdatedPage = false;
    // }
  }
  ngOnInit() {
    this.getAllTags();
    this.getAllCategories();
  }
  onSubmit(data: FormGroup) {
    console.log(data.value);
    let myData = new FormData();
    myData.append('name', data.value.name);
    myData.append('price', data.value.price);
    myData.append('description', data.value.description);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('tagId', data.value.tagId);
    myData.append('recipeImage', this.imgSrc, this.imgSrc.name);
    console.log(myData);
    if (this.recipeId) {
      this.edit();
    }else{
      this.add();
    }
  }

  add(){
    let formData = new FormData();
    this._recipeService.addRecipe(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.toastr.success(this.message, 'Done!');
        this._router.navigate(['/dashboard/admin/recipes']);
      },
    });
  }
  edit(){
    let formData = new FormData();
    this._recipeService.editRecipe(this.recipeId,formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.toastr.success(this.message, 'Done!');
        this._router.navigate(['/dashboard/admin/recipes']);
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
  getAllCategories() {
    this._helperService.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data;
      },
    });
  }
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
  getRecipeById(id: any) {
    this._recipeService.getRecipeById(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.toastr.success(this.message, 'Done!');
        this._router.navigate(['/dashboard/admin/recipes']);
      },
    });
  }
}