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

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }


  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
