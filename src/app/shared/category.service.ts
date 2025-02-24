import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs-compat";
import { Category } from "./category.model";


@Injectable()
export class CategoryService {
    //CHANGE TO PUT IN .env file
    private apiUrl = 'http://127.0.0.1:8000/api/categories/';

    private categoriesChanged = new Subject<void>();

    categoriesChanged$ = this.categoriesChanged.asObservable();

    notifyCategoriesChanged() {
        this.categoriesChanged.next();
    }

    constructor(private http: HttpClient) {}

    //Get all categories
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl)
    }

    //delete a specific category
    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}/delete/`)
    }

    //save new categories
    saveCategories(categories: Category[]): Observable<Category[]> {
        return this.http.put<Category[]>(`${this.apiUrl}update/`, categories);
    }

}