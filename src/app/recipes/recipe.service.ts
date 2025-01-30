import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel',
            'This is simply a test',
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c19a4f2-e566-4d27-ac0b-111fb11d7440/d15lcm9-3a2d2a31-80ff-453c-a41f-7692dad390a1.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBjMTlhNGYyLWU1NjYtNGQyNy1hYzBiLTExMWZiMTFkNzQ0MFwvZDE1bGNtOS0zYTJkMmEzMS04MGZmLTQ1M2MtYTQxZi03NjkyZGFkMzkwYTEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.skh2x5QlKLV5veFSSG4scLPUcoFAPlKVeV_TUkkHXvc',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)

            ]),
        new Recipe('Big Fat Burger',
            'This is simply a test',
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c19a4f2-e566-4d27-ac0b-111fb11d7440/d15lcm9-3a2d2a31-80ff-453c-a41f-7692dad390a1.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBjMTlhNGYyLWU1NjYtNGQyNy1hYzBiLTExMWZiMTFkNzQ0MFwvZDE1bGNtOS0zYTJkMmEzMS04MGZmLTQ1M2MtYTQxZi03NjkyZGFkMzkwYTEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.skh2x5QlKLV5veFSSG4scLPUcoFAPlKVeV_TUkkHXvc',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    ]
    
    getRecipes() {
        return this.recipes.slice(); //only get a copy
    }


    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    constructor(private slService: ShoppingListService){
        
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    //overrides recipes with the recipes fetched from the backend
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        //inform interested places in app, got new recipes
        this.recipesChanged.next(this.recipes.slice());
    }

}