import { Component, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[];


  constructor(private recipeService: RecipeService) { }


  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

}
