import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category.model';
import * as bootstrap from 'bootstrap';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrl: './categories-edit.component.css'
})
export class CategoriesEditComponent {
  categories: Category[] = [];
  confirmDeleteIndex: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService){}

  private readonly MAX_DEMO_CATEGORIES = 50;

  ngOnInit(){
    this.getCategories();
  }

  //Get all categories from the backend
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    )
  }

  toggleConfirmDelete(index: number) {
    this.confirmDeleteIndex = this.confirmDeleteIndex === index ? null : index;
  }

  //Delete a category
  onDeleteCategory(index: number, id?: number){
    if(id){
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.categories.splice(index, 1);
          this.categoryService.notifyCategoriesChanged();
        },
        (error) => {
          console.error('Error deleting category', error);
        }
      );
    } else{
      //If the category was just added and is not saved in backend, therefore no id
      this.categories.splice(index, 1);
      
    }
    this.confirmDeleteIndex = null;
  }


  //Add a category
  onAddCategory(){
    if(environment.useBackend){
      this.categories.push({ id: null, name: '' })
    } else {
      if(this.categories.length >= this.MAX_DEMO_CATEGORIES) {
        alert("Category limit reached! You can't add more than 50 categories in the demo.")
        return;
      } else{
        this.categories.push({ id: null, name: ''});
      }
    }
    
  }

  onSaveChanges(): void {
    this.categoryService.saveCategories(this.categories).subscribe(
      (response) => {
        console.log('Categories updated successfully', response);
        this.categoryService.notifyCategoriesChanged();
        this.onCancel();
      },
      (error) => {
        console.error('Error updating categories', error);
      }
    );
    console.log('save changes');
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  invalidInputs(): boolean{
    return this.categories.some(cat => cat.name.trim() === '');
  }

}
