import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from './../category.service';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './category-list.page.html',
    styleUrl: './category-list.page.scss'
})
export class CategoryListPage implements OnInit{

    dataSource = new MatTableDataSource<Category>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(
            categories => this.dataSource.data = categories
        );
    }
}
