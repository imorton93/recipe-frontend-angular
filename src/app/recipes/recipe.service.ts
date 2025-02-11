import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    testIngredients: Ingredient[] = [
        new Ingredient("boneless, skinless chicken breasts", "4"),
        new Ingredient("tsp smoked paprika", "2 1/2"),
        new Ingredient("tsp brown sugar", "2"),
        new Ingredient("tsp salt", "1 1/2"),
        new Ingredient("tsp garlic powder", "1 1/2"),
        new Ingredient("tsp onion powder", "1"),
        new Ingredient("tsp freshly cracked black pepper", "1/2"),
        new Ingredient("tsp cayenne pepper", "1/2"),
        new Ingredient("Tbsp olive oil", "1")
    ];
    testInstructions: string[] = [
        "Start by making the brine. In a large bowl add the kosher salt, granulated sugar, and water. Whisk until the salt and sugar are completely dissolved.",
        "Place the chicken breasts on a cutting board, cover them with plastic wrap, then use a rolling pin or a meat mallet to gently pound the chicken breast until the entire breast is an even thickness from one end to the other (about 1/2 to 3/4 inch thick).",
        "Place the chicken breasts in the brine mixture, cover the bowl with plastic wrap, and place the bowl in the refrigerator for 30 minutes.",
        "Preheat the oven to 425°F. In a small bowl mix the smoked paprika, brown sugar, salt, garlic powder, onion powder, freshly cracked black pepper, and cayenne pepper.",
        "After 30 minutes remove the chicken breasts from the brine and rinse under cold water. Pat the chicken dry with paper towels and allow it to come to room temperature for at least 10 minutes.",
        "Now drizzle the olive oil over both sides of the chicken breasts, then generously coat both sides with the seasoning blend. Rub the seasoning into the breasts with your hands making sure the entire chicken breast is evenly coated with spices.",
        "Place the seasoned chicken breasts in a large 9×13-inch baking dish. Bake uncovered for 18-20 minutes or until the internal temperature reaches 165°F.",
        "Remove the chicken from the oven and allow it to rest for a few minutes so the juices can redistribute throughout the breast. Serve and enjoy!"
    ]
    testRecipe: Recipe = new Recipe("Baked Chicken Breast Recipe", this.testIngredients,  this.testInstructions);
    private recipes: Recipe[] = [this.testRecipe];
    
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