import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    private name: string;
    private ingredients: Ingredient[];
    private instructions: string[];
    private additionalNotes: string;
    private imageUrl?: string;
    private website?: string;
    
    constructor(name: string, ingredients: Ingredient[], instructions: string[], additionalNotes: string = "") {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.additionalNotes = additionalNotes;
    }

    public getName(): string {
        return this.name;
    }

    public getIngredients(): Ingredient[] {
        return this.ingredients;
    }

    public getInstructions(): string[] {
        return this.instructions;
    }

    public getAdditionalNotes(): string {
        return this.additionalNotes;
    }

    public getImageUrl(): string {
        if(this.imageUrl === undefined){
            return "";
        }
        return this.imageUrl;
    }

    public getWebsite(): string {
        if(this.website === undefined){
            return "";
        }
        return this.website;
    }

    public setImageUrl(newImageUrl: string): void {
        this.imageUrl = newImageUrl;
    }

    public setWebsite(newWebsite: string): void {
        this.website = newWebsite;
    }

    public setName(newName: string): void {
        this.name = newName;
    }


}