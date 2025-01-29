import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        //informs other interested components about event we are emitting
        this.ingredientsChanged.emit(this.ingredients.slice()); //everytime ingredients change, pass copy of ingredients
        
    }

    addIngredients(ingredients: Ingredient[]) {
        // lots of event emitters
        // for (let ingredient of ingredients) {
        //    this.addIngredient(ingredient); issue, lots of event emissions

        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}