import { Component, OnDestroy } from '@angular/core';

import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../shared/category.model';
import { CategoryService } from '../../shared/category.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  selectedDisplay: string = 'all';
  meals: string[] = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Drinks"];
  mealOpen: boolean = false;
  openedMeal: string = "";
  categoryOpen: boolean = false;
  openedCategory: string = "";
  categories: Category[] = []

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService) { }


  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged$.subscribe(() => {
      this.fetchRecipes();
    });

    this.fetchRecipes();
    this.fetchCategories();

  }

  fetchRecipes(){
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;
      console.log(this.recipes);
    });
  }

  fetchCategories(){
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    })
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  selectDisplay(display: string) {
    if(this.selectedDisplay === "meals" && display !== "meals"){
      this.closeMeal();
    }
    if(this.selectedDisplay === "categories" && display !== "categories"){
      this.closeCategory();
    }
    this.selectedDisplay = display;
  }

  openMeal(meal: string){
    if(this.openedMeal === meal){
      this.mealOpen = true;
      this.openedMeal = "meal";
    } else {
      this.mealOpen = true;
      this.openedMeal = meal;
    }
  }

  closeMeal(){
    this.mealOpen = false;
    this.openedMeal = "";
  }

  filterRecipesByMeal(meal: string): Recipe[] {
    return this.recipes.filter(r => r.getMealType() === meal);
  }

  openCategory(newCategory: Category){
    if(this.openedCategory === newCategory.name){
      this.categoryOpen = true;
      this.openedCategory = "meal";
    } else {
      this.categoryOpen = true;
      this.openedCategory = newCategory.name;
    }
  }

  closeCategory(){
    this.categoryOpen = false;
    this.openedCategory = "";
  }

  filterRecipesByCategory(category: Category): Recipe[] {
    return this.recipes.filter(r => r.getCategories().includes(category.id));
  }

}
