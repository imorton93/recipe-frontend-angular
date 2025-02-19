import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    private id: number;
    private name: string;
    private ingredients: Ingredient[];
    private instructions: string[];
    private additional_notes?: string;
    private servings?: number;
    private image_url?: string;
    private website?: string;
    
    constructor(
        id: number | null = null,
        name: string,
        ingredients: Ingredient[],
        instructions: string[],
        additional_notes?: string,
        servings?: number,
        image_url?: string,
        website?: string
    ) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.additional_notes = additional_notes;
        this.servings = servings;
        this.image_url = image_url;
        this.website = website;
    }

    public getId(): number {
        return this.id;
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
        return this.additional_notes;
    }

    public getServings(): number {
        if(this.servings === undefined){
            return null;
        }
        return this.servings;
    }

    public getImageUrl(): string {
        if(this.image_url === undefined){
            return "";
        }
        return this.image_url;
    }

    public getWebsite(): string {
        if(this.website === undefined){
            return "";
        }
        return this.website;
    }

    public setName(newName: string): void {
        this.name = newName;
    }

    public setIngredients(newIngredients: Ingredient[]): void {
        this.ingredients = newIngredients;
    }

    public setInstructions(newInstructions: string[]): void {
        this.instructions = newInstructions;
    }

    public setAdditionalNotes(newNotes: string): void {
        this.additional_notes = newNotes;
    }

    public setServings(newServing: number): void {
        this.servings = newServing;
    }

    public setImageUrl(newImageUrl: string): void {
        this.image_url = newImageUrl;
    }

    public setWebsite(newWebsite: string): void {
        this.website = newWebsite;
    }


}