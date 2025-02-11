import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    ingredients: Ingredient[] = [];

    getIngredients() {
        return this.ingredients.slice();
    }


    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        //informs other interested components about event we are emitting
        this.ingredientsChanged.next(this.ingredients.slice()); //everytime ingredients change, pass copy of ingredients
        
    }

    addIngredients(ingredients: Ingredient[]) {
        // lots of event emitters
        // for (let ingredient of ingredients) {
        //    this.addIngredient(ingredient); issue, lots of event emissions

        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}