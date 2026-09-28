import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-confirmation',
    standalone: true,
    imports: [],
    templateUrl: './dialog-confirmation.html',
    styleUrl: './dialog-confirmation.scss',
})
export class DialogConfirmation {
    protected readonly title = signal<string | null>(null);
    protected readonly description = signal<string | null>(null);

    protected readonly dialogRef = inject(MatDialogRef<DialogConfirmation>);
    protected readonly data = inject(MAT_DIALOG_DATA);

    ngOnInit(): void {
        this.title.set(this.data.title);
        this.description.set(this.data.description);
    }

    onClose(value = false) {
        this.dialogRef.close(value);
    }
}