import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { PaginatedData } from '../core/model/page/PaginatedData';
import { Prestamo } from './model/Prestamo';
import { PrestamoFilter } from './model/PrestamoFilter';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  protected readonly http = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/prestamo';

  getPrestamos(pageable: Pageable, filter: PrestamoFilter): Observable<PaginatedData<Prestamo>> {
    return this.http.post<PaginatedData<Prestamo>>(this.baseUrl, { pageable, ...filter }); // ...filter copia les propietats de filter dins l'objecte que s'envia al backend
  }

  savePrestamo(prestamo: Prestamo): Observable<void> {
    const url = prestamo.id ? `${this.baseUrl}/${prestamo.id}` : this.baseUrl; // Si té id modifica, sino crea un prestam nou
    return this.http.put<void>(url, prestamo);
  }

  deletePrestamo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
