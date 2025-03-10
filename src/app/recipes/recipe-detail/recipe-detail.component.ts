import { Component } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  recipe: Recipe;
  id: number;
  confirmDeleteRecipe = false;


  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        // Subscribe to the observable to get the recipe
        this.recipeService.getRecipe(this.id)
          .subscribe(
            (recipeData: Recipe) => {
              this.recipe = recipeData;  // Assign the received data to 'recipe'
            },
            error => {
              console.error('Error fetching recipe', error); // Handle errors
            }
          );
    });
  }

  toggleConfirmDeleteRecipe() {
    this.confirmDeleteRecipe = !this.confirmDeleteRecipe;
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }


  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id).subscribe(
      response => {
        // console.log("Recipe deleted successfully", response);
        this.recipeService.notifyRecipesChanged();
        this.router.navigate(['/recipes']);
      }
    );
    
  }

  toggleFavorite() {
    if (this.recipe) {
      this.recipe.setFavorite(!this.recipe.getFavorite());
      this.recipeService.updateRecipe(this.recipe.getId(), this.recipe).subscribe(
        response => {
          this.recipeService.notifyRecipesChanged();
        }
      )
    }
  }

}
