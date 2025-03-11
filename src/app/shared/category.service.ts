import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Subject } from "rxjs";
import { Observable } from "rxjs-compat";
import { Category } from "./category.model";
import { environment } from "../../environments/environment";


@Injectable()
export class CategoryService {
    //CHANGE TO PUT IN .env file
    private apiUrl = 'http://127.0.0.1:8000/api/categories/';

    private categoriesChanged = new Subject<void>();
    categoriesChanged$ = this.categoriesChanged.asObservable();

    private mockCategories: Category[] = [
        { id: 1, name: "Air Fryer"},
        { id: 1, name: "Bread"},
        { id: 1, name: "Chicken"},
        { id: 1, name: "Beef"},
        { id: 1, name: "Pasta"},
        { id: 1, name: "Sauce"},
        { id: 1, name: "Instant Pot"},
        { id: 1, name: "Salad"},
    ]

    notifyCategoriesChanged() {
        this.categoriesChanged.next();
    }

    constructor(private http: HttpClient) {}

    //Get all categories
    getCategories(): Observable<Category[]> {
        if(environment.useBackend){
            return this.http.get<Category[]>(this.apiUrl);
        } else{
            return of(this.mockCategories);
        }
    }

    //delete a specific category
    deleteCategory(id: number): Observable<void> {
        if (environment.useBackend){
            return this.http.delete<void>(`${this.apiUrl}${id}/delete/`)
        } else {
            this.mockCategories = this.mockCategories.filter(cat => cat.id !== id);
            this.notifyCategoriesChanged();
            return of();
        }
        
    }

    //save new categories
    saveCategories(categories: Category[]): Observable<Category[]> {
        if(environment.useBackend){
            return this.http.put<Category[]>(`${this.apiUrl}update/`, categories);
        } else {
            this.mockCategories = categories;
            this.notifyCategoriesChanged();
            return of(this.mockCategories);
        }
        
    }

}