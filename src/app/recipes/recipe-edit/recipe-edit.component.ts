import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent {
  id: number;
  editMode = false;
  recipeForm: FormGroup;


  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router){

  }

  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }


  onSubmit(){
    let instructionsArr: string[] = [];

    this.recipeForm.value['instructions'].forEach((item) => {
      instructionsArr.push(item.instruction);
    })

    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['ingredients'], 
      instructionsArr,
      this.recipeForm.value['additionalNotes']
    );
    
    newRecipe.setImageUrl(this.recipeForm.value['imagePath']);
    newRecipe.setWebsite(this.recipeForm.value['website']);
    
    

    
    console.log(this.recipeForm);
    if (this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  //called whenever route params change
  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeWebsite = '';
    let recipeAdditionalNotes = '';
    let recipeIngredients = new FormArray([]);
    let recipeInstructions = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.getName();
      recipeImageUrl= recipe.getImageUrl();
      recipeAdditionalNotes = recipe.getAdditionalNotes();
      recipeWebsite = recipe.getWebsite();
      if (recipe['ingredients']) {
        for (let ingredient of recipe.getIngredients()) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required
              ])
            })
          );
        }
      }
      for (let instruction of recipe.getInstructions()) {
        recipeInstructions.push(
          new FormGroup({
            'instruction': new FormControl(instruction, Validators.required)
          })
        )
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImageUrl),
      'website': new FormControl(recipeWebsite),
      'additionalNotes': new FormControl(recipeAdditionalNotes),
      'ingredients': recipeIngredients,
      'instructions': recipeInstructions
    });

    this.resizeInstructions();
    

  }

  //resize instruction in initForm
  //increases size of input area to show the entirety of the instruction
  private resizeInstructions() {
    const instructions = (this.recipeForm.get('instructions') as FormArray).controls;

    instructions.forEach((ctrl, index) => {
      const instructionField = ctrl.get('instruction')?.value;

      setTimeout(() => {
        const textarea = document.querySelectorAll('textarea')[index] as HTMLTextAreaElement;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';;
        }
      }, 0)
    })
  }

  get instructionControls() {
    return (<FormArray>this.recipeForm.get('instructions')).controls;
  }


  get ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onAddInstruction(){
    (<FormArray>this.recipeForm.get('instructions')).push(
      new FormGroup({
        'instruction': new FormControl(null, Validators.required)
      })
    )
  }

  onDeleteInstruction(index: number){
    (<FormArray>this.recipeForm.get('instructions')).removeAt(index);
  }


  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required
        ])
      })
    )
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Set new height
  }

}
