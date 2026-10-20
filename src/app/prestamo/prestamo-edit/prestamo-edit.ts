import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../../client/model/Client';
import { ClientService } from '../../client/client.service';
import { Game } from '../../game/model/Game';
import { GameService } from '../../game/game.service';
import { fromIsoDate, toIsoDate } from '../../core/helpers/date.helper';
import { Prestamo } from '../model/Prestamo';
import { PrestamoService } from '../prestamo.service';

@Component({
  selector: 'app-prestamo-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './prestamo-edit.html',
  styleUrl: './prestamo-edit.scss',
})
export class PrestamoEdit implements OnInit {
  protected readonly id = signal<number | null>(null);
  protected readonly clientId = signal<number | null>(null);
  protected readonly gameId = signal<number | null>(null);
  protected readonly startDate = signal<Date | null>(null);
  protected readonly endDate = signal<Date | null>(null);

  protected readonly clients = signal<Client[]>([]);
  protected readonly games = signal<Game[]>([]);

  protected readonly dialogRef = inject(MatDialogRef<PrestamoEdit>);
  protected readonly data = inject(MAT_DIALOG_DATA) as { prestamo?: Prestamo };
  protected readonly prestamoService = inject(PrestamoService);
  protected readonly clientService = inject(ClientService);
  protected readonly gameService = inject(GameService);
  protected readonly snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadFormData(this.data.prestamo ?? null);
  }

  loadFormData(initialData: Prestamo | null): void {
    this.id.set(initialData?.id ?? null);
    this.startDate.set(initialData ? fromIsoDate(initialData.startDate) : null);
    this.endDate.set(initialData ? fromIsoDate(initialData.endDate) : null);

    this.clientService.getClients().subscribe((clients) => {
      this.clients.set(clients);
      this.clientId.set(initialData?.client?.id ?? null);
    });

    this.gameService.getGames().subscribe((games) => {
      this.games.set(games);
      this.gameId.set(initialData?.game?.id ?? null);
    });
  }

  onSave() {
    const clientId = this.clientId();
    const gameId = this.gameId();
    const startDate = this.startDate();
    const endDate = this.endDate();

    // Tots els camps son obligatoris
    if (!clientId || !gameId || !startDate || !endDate) {
      return;
    }

    const prestamo = {
      id: this.id(),
      client: this.clients().find((c) => c.id === clientId) ?? null,
      game: this.games().find((g) => g.id === gameId) ?? null,
      startDate: toIsoDate(startDate),
      endDate: toIsoDate(endDate),
    } as Prestamo;

    this.prestamoService.savePrestamo(prestamo).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) =>
        this.snackBar.open(
          error.error?.message ?? 'No se ha podido guardar el préstamo',
          'Cerrar',
          {
            duration: 7000,
          },
        ),
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
