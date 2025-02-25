import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent {
  id: number;
  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;
  errorMessage: string | null = null;
  // Recipe meal types and Categories
  mealTypes: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Drinks'];
  categories: Category[] = [];
  selectedCategories: number[] = [];

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router, private categoryService: CategoryService){}

  ngOnInit(){
    this.getCategories();

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if(this.editMode){
        this.recipeService.getRecipe(this.id).subscribe(
          (recipeData: Recipe) => {
            this.recipe = recipeData;
            this.initForm();
          },
          error => {
            console.error('Error fetching recipe', error);
            //LATER ADD NAVIGATE TO ERROR PAGE
          }
        )
      }else{
        this.recipe = new Recipe(null, '', [], [], '', '', null, '', '',[]);
        this.initForm();

      }
      
    })
  }


  onSubmit(){
    let instructionsArr: string[] = [];

    this.recipeForm.value['instructions'].forEach((item) => {
      instructionsArr.push(item.instruction);
    })


    this.recipe.setName(this.recipeForm.value['name']);
    this.recipe.setIngredients(this.recipeForm.value['ingredients']);
    this.recipe.setInstructions(instructionsArr);
    this.recipe.setAdditionalNotes(this.recipeForm.value['additionalNotes']);
    this.recipe.setServings(this.recipeForm.value['servings']);
    this.recipe.setImageUrl(this.recipeForm.value['imagePath']);
    this.recipe.setWebsite(this.recipeForm.value['website']);
    this.recipe.setMealType(this.recipeForm.value['mealType']);
    console.log("The selected categories: ",this.selectedCategories)
    this.recipe.setCategories(this.selectedCategories);
    console.log(this.recipe);
    if (this.editMode){
      console.log('Recipe that is being sent', this.recipe)
      this.recipeService.updateRecipe(this.id, this.recipe).subscribe(
        response => {
          console.log("Recipe updated successfully", response);
          this.recipeService.notifyRecipesChanged();
          this.onCancel(); //optionally navigate after successful update
        }
      );
    } else {
      this.recipeService.addRecipe(this.recipe).subscribe(
        response => {
          console.log("Recipe added successfully", response);
          this.recipeService.notifyRecipesChanged();
          this.onCancel();
        }
      )
    }
  }

  //called whenever route params change
  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeWebsite = '';
    let recipeServings = null;
    let recipeAdditionalNotes = ''; 
    let recipeIngredients = new FormArray([]);
    let recipeInstructions = new FormArray([]);
    let recipeMealType = '';
    let recipeCategories: number[] = [];

    if (this.editMode) {
      recipeName = this.recipe.getName();
      recipeImageUrl= this.recipe.getImageUrl();
      recipeAdditionalNotes = this.recipe.getAdditionalNotes();
      recipeWebsite = this.recipe.getWebsite();
      recipeServings = this.recipe.getServings();
      recipeMealType = this.recipe.getMealType() || '';   
      recipeCategories = this.recipe.getCategories() || []; 
      
      if (this.recipe['ingredients']) {
        for (let ingredient of this.recipe.getIngredients()) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required)
            })
          );
        }
      }

      for (let instruction of this.recipe.getInstructions()) {
        recipeInstructions.push(
          new FormGroup({
            'instruction': new FormControl(instruction, Validators.required)
          })
        )
      }

      //sets selected categories
      this.selectedCategories = recipeCategories;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImageUrl),
      'website': new FormControl(recipeWebsite),
      'additionalNotes': new FormControl(recipeAdditionalNotes),
      'ingredients': recipeIngredients,
      'instructions': recipeInstructions,
      'servings': new FormControl(recipeServings, Validators.min(1)),
      'mealType': new FormControl(recipeMealType, Validators.required),
      'categories': new FormControl(recipeCategories),
    });

    this.resizeInstructions();
    
  }

  onCategoryChange(event: Event, category: Category) {
    
    const inputElement = event.target as HTMLInputElement;
    if(!inputElement || inputElement.type !== 'checkbox'){
      
      return;
    } 

    if (inputElement.checked){
      this.selectedCategories.push(category.id);
    } else{
      this.selectedCategories = this.selectedCategories.filter(c => c !== category.id);
    }
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

  setIngredients(ingredientsArray: string[]){
    const ingredientsFormArray = this.recipeForm.get('ingredients') as FormArray;

    ingredientsFormArray.clear()

    ingredientsArray.forEach(ingredient => {
      ingredientsFormArray.push(
        new FormGroup({
          'name': new FormControl(ingredient, Validators.required)
        })
      )
    })
  }

  setInstructions(instructionsArray: string[]){
    const instructionsFormArray = this.recipeForm.get('instructions') as FormArray;
    instructionsFormArray.clear();

    instructionsArray.forEach(instruction => {
      instructionsFormArray.push(
        new FormGroup({
          'instruction': new FormControl(instruction, Validators.required)
        })
      )
    })
  }


  //populate the form fields based on data received from the recipe parser
  populateFormFields(data){
    if(data.title){
      this.recipeForm.get('name')?.setValue(data.title);
    }
    if(data.image){
      this.recipeForm.get('imagePath')?.setValue(data.image);
    }
    if(data.servings){
      const servings = parseInt(data.servings.match(/\d+/)?.[0] || '', 10) || null;
      this.recipeForm.get('servings')?.setValue(servings);
    }
    if(data.ingredients){
      this.setIngredients(data.ingredients);
    }
    if(data.instructions){
      const instructionsArray = data.instructions.split('\n');
      this.setInstructions(instructionsArray);
    }
    this.resizeInstructions();
    
  }

  //calls recipeServices scrape Recipe to use backend recipe scraper
  autoPopulateFields() {
    const websiteUrl = this.recipeForm.get('website')?.value;
    
    this.recipeService.scrapeRecipe(websiteUrl).subscribe(
      (data) => {
        console.log(data);
        this.populateFormFields(data);
        this.errorMessage = null;
      },
      (error) => {
        console.error('Failed to scrape recipe:', error);
        this.errorMessage = 'Failed to parse recipe. Please check the URL or try again later.';
      }
    )
  }

  //Get all categories from the backend
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    )
  }

  isCategorySelected(category: Category): boolean {
    return this.selectedCategories.some(c => c === category.id);
  }

}
