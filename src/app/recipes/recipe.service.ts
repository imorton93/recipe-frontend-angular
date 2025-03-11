import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { of,Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";

@Injectable()
export class RecipeService {
    //CHANGE TO PUT IN .env file
    private apiUrl = 'http://127.0.0.1:8000/api/recipes/';

    private recipesChanged = new Subject<void>();
    recipesChanged$ = this.recipesChanged.asObservable();

    private readonly MAX_DEMO_RECIPES = 50;
    private mockRecipes: Recipe[] = [];

    notifyRecipesChanged() {
        this.recipesChanged.next();
    }

    
    getRecipes(): Observable<Recipe[]> {
        if (environment.useBackend){
            return this.http.get<Recipe[]>(this.apiUrl)
                .pipe(
                    map((data: any[]) => {
                        return data.map((recipeData) => {
                            return new Recipe(
                                recipeData.id,
                                recipeData.name,
                                recipeData.ingredients,
                                recipeData.instructions,
                                recipeData.mealType,
                                recipeData.favorite,
                                recipeData.additional_notes,
                                recipeData.servings,
                                recipeData.image_url,
                                recipeData.website,
                                recipeData.categories,
                            );
                        });
                    })
                );
        } else {
            return of(this.mockRecipes);
        }
    }


    getRecipe(id: number): Observable<Recipe> {
        if (environment.useBackend){
            return this.http.get<Recipe>(`${this.apiUrl}${id}/`).pipe(
                map((recipeData: any) => {
                    return new Recipe(
                        recipeData.id,
                        recipeData.name,
                        recipeData.ingredients,
                        recipeData.instructions,
                        recipeData.mealType,
                        recipeData.favorite,
                        recipeData.additional_notes,
                        recipeData.servings,
                        recipeData.image_url,
                        recipeData.website,
                        recipeData.categories,
                    );
                })
            );
        } else{
            const foundRecipe = this.mockRecipes.find(r => r.getId() === id);
            return of(foundRecipe ? foundRecipe : new Recipe(0, "Not Found", [], [], "", false, "", 0, "", "", []));
        }
    }

    constructor(private http: HttpClient){
        
    }

    addRecipe(recipe: Recipe) {
        if (environment.useBackend){
            return this.http.post<Recipe>(`${this.apiUrl}add/`, recipe);
        } else{

            if (this.mockRecipes.length >= this.MAX_DEMO_RECIPES){
                return of(null);
            }

            const maxId = this.mockRecipes.length > 0 ? Math.max(...this.mockRecipes.map(r => r.getId())) : 0;

            recipe.setId(maxId + 1);

            this.mockRecipes.push(recipe);
            this.notifyRecipesChanged();
            return of(recipe);
        }
    }

    updateRecipe(id: number, newRecipe: Recipe){
        if (environment.useBackend) {
            return this.http.put<Recipe>(`${this.apiUrl}${id}/update/`, newRecipe);
        } else {
            const index = this.mockRecipes.findIndex(r => r.getId() === id);
            if (index !== -1) {
                this.mockRecipes[index] = newRecipe;
                this.notifyRecipesChanged();
            }
            return of(newRecipe);
        }
        
    }

    deleteRecipe(id: number) {
        if(environment.useBackend){
            return this.http.delete<void>(`${this.apiUrl}${id}/delete/`);
        } else {
            this.mockRecipes = this.mockRecipes.filter(r => r.getId() !== id);
            this.notifyRecipesChanged();
            return of();
        }
        
    }

    
    scrapeRecipe(websiteUrl: string): Observable<any> {
        return this.http.get<any>(`http://127.0.0.1:8000/api/scrape-recipe/?url=${encodeURIComponent(websiteUrl)}`);
    }

}