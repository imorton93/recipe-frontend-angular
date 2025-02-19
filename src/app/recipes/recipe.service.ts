import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipeService {
    //CHANGE TO PUT IN .env file
    private apiUrl = 'http://127.0.0.1:8000/api/recipes/';

    private recipesChanged = new Subject<void>();

    recipesChanged$ = this.recipesChanged.asObservable();

    notifyRecipesChanged() {
        this.recipesChanged.next();
    }

    
    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.apiUrl)
            .pipe(
                map((data: any[]) => {
                    return data.map((recipeData) => {
                        return new Recipe(
                            recipeData.id,
                            recipeData.name,
                            recipeData.ingredients,
                            recipeData.instructions,
                            recipeData.additional_notes,
                            recipeData.servings,
                            recipeData.image_url,
                            recipeData.webstie
                        );
                    });
                })
            );
    }


    getRecipe(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.apiUrl}${id}/`).pipe(
            map((recipeData: any) => {
                return new Recipe(
                    recipeData.id,
                    recipeData.name,
                    recipeData.ingredients,
                    recipeData.instructions,
                    recipeData.additional_notes,
                    recipeData.servings,
                    recipeData.image_url,
                    recipeData.website
                );
            })
        );
    }

    constructor(private http: HttpClient){
        
    }

    addRecipe(recipe: Recipe) {
        return this.http.post<Recipe>(`${this.apiUrl}add/`, recipe);
    }

    updateRecipe(id: number, newRecipe: Recipe){
        return this.http.put<Recipe>(`${this.apiUrl}${id}/update/`, newRecipe);
    }

    deleteRecipe(id: number) {
        return this.http.delete<void>(`${this.apiUrl}${id}/delete/`);
    }

}