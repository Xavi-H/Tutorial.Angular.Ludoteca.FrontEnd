import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Observable<Category[]> {
    return new Observable();
  }
}