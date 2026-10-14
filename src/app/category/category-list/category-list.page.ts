import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/Category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEdit } from '../category-edit/category-edit';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './category-list.page.html',
  styleUrl: './category-list.page.scss',
})
export class CategoryList implements OnInit {
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  protected readonly categoryService = inject(CategoryService);
  protected readonly dialog = inject(MatDialog);
  protected readonly snackBar = inject(MatSnackBar); // Per gestionar els missatges i mostrar-los a l'usuari

  loadData(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.dataSource.data = categories));
  }

  ngOnInit(): void {
    this.loadData();
  }

  createCategory() {
    const dialogRef = this.dialog.open(CategoryEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadData();
    });
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEdit, {
      data: { category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadData();
    });
  }

  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: {
        title: 'Eliminar categoría',
        description:
          'Atención: si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?',
      },
    });

    // Mostra un missatge d'error si s'ha gestionat una excepció en el backend
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(category.id).subscribe({
          next: () => this.loadData(),
          error: (error) =>
            this.snackBar.open(
              error.error?.message ?? 'No se ha podido eliminar la categoría', // Si no rep un missatge d'error específic del backend, mostra un missatge genèric
              'Cerrar',
              { duration: 7000 } // Mostra el missatge durant 7 segons si no es tanca manualment
            ),
        });
      }
    });
  }
}
