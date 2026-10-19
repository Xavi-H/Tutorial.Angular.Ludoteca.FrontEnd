import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Prestamo } from '../model/Prestamo';
import { PrestamoService } from '../prestamo.service';
import { Pageable } from '../../core/model/page/Pageable';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './prestamo-list.page.html',
  styleUrl: './prestamo-list.page.scss',
})
export class PrestamoList implements OnInit {
  protected readonly prestamoService = inject(PrestamoService);

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Prestamo>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'endDate'];

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: event?.pageIndex ?? this.pageNumber, // Si hi ha event s'utilitza el seu valor, sino és manté el valor actual de pageNumber
      pageSize: event?.pageSize ?? this.pageSize,
      sort: [{ property: 'id', direction: 'ASC' }],
    };

    this.prestamoService.getPrestamos(pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }
}
