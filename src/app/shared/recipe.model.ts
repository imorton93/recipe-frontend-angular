import { Ingredient } from "./ingredient.model";

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

    public getImageUrl(): string | undefined {
        return this.imageUrl;
    }

    public getWebsite(): string | undefined {
        return this.website;
    }

}