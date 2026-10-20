import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Prestamo } from '../model/Prestamo';
import { PrestamoService } from '../prestamo.service';
import { Pageable } from '../../core/model/page/Pageable';
import { Client } from '../../client/model/Client';
import { ClientService } from '../../client/client.service';
import { Game } from '../../game/model/Game';
import { GameService } from '../../game/game.service';
import { PrestamoFilter } from '../model/PrestamoFilter';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { toIsoDate } from './../../core/helpers/date.helper';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './prestamo-list.page.html',
  styleUrl: './prestamo-list.page.scss',
})
export class PrestamoList implements OnInit {
  protected readonly prestamoService = inject(PrestamoService);
  protected readonly gameService = inject(GameService);
  protected readonly clientService = inject(ClientService);

  // Les opcions que es mostren a l'usuari per filtrar
  protected readonly games = signal<Game[]>([]);
  protected readonly clients = signal<Client[]>([]);

  // El que l'usuari ha seleccionat al filtrar
  protected readonly filterGame = signal<Game | null>(null);
  protected readonly filterClient = signal<Client | null>(null);
  protected readonly filterDate = signal<Date | null>(null);

  // L'ultim filtre aplicat, (despres de clciar el botó de filtrar)
  private appliedFilter: PrestamoFilter = { idGame: null, idClient: null, date: null };

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Prestamo>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'endDate'];

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => this.games.set(games));
    this.clientService.getClients().subscribe((clients) => this.clients.set(clients));
    this.loadPage();
  }

   onSearch(): void {
    const date = this.filterDate();

    this.appliedFilter = {
      idGame: this.filterGame()?.id ?? null,
      idClient: this.filterClient()?.id ?? null,
      date: date ? toIsoDate(date) : null,
    };

    this.pageNumber = 0;
    this.loadPage();
  }

  onCleanFilter(): void {
    this.filterGame.set(null);
    this.filterClient.set(null);
    this.filterDate.set(null);
    this.onSearch();
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: event?.pageIndex ?? this.pageNumber, // Si hi ha event s'utilitza el seu valor, sino és manté el valor actual de pageNumber
      pageSize: event?.pageSize ?? this.pageSize,
      sort: [{ property: 'id', direction: 'ASC' }],
    };

    this.prestamoService.getPrestamos(pageable, this.appliedFilter).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }
}
