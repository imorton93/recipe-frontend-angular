import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";


@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {

    }

    // //called to save current recipes in backend server
    // storeRecipes() {
    //     const recipes: Recipe[] = this.recipeService.getRecipes();
    //     return this.http.put('URL_YOU_WANT_TO_SEND_TO', recipes).subscribe(response =>{
    //         console.log(response);
    //     });
    // }

    // //called to fetch recipes from backend server
    // fetchRecipes() {
    //     return this.http.get<Recipe[]>('URL_YOU_WANT_TO_SEND_TO')
    //     .pipe(map(recipes => {
    //         return recipes.map(recipe => {
    //             return {...recipe, ingredients: recipe.getIngredients() ? recipe.getIngredients() : []};
    //         });
    //     }),
    //     tap(recipes => {
    //         this.recipeService.setRecipes(recipes);
    //     })
    //     )
    //     .subscribe(recipes => {
    //         this.recipeService.setRecipes(recipes);
    //     });
    // }


}