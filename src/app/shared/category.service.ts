import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs-compat";
import { Category } from "./category.model";


@Injectable()
export class CategoryService {
    //CHANGE TO PUT IN .env file
    private apiUrl = 'http://127.0.0.1:8000/api/categories/';

    private recipesChanged = new Subject<void>();

    recipesChanged$ = this.recipesChanged.asObservable();

    constructor(private http: HttpClient) {}

    //Get all categories
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl)
    }

}