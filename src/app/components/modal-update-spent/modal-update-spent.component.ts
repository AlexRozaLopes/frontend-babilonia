import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Spent } from '../../interface/spent';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpentType } from '../../interface/spentType';

interface UpdateSpent {
  spent: Spent;
  title: string;
}

@Component({
  selector: 'app-modal-update-spent',
  standalone: true,
  imports: [MatDialogModule, FormsModule, CommonModule],
  templateUrl: './modal-update-spent.component.html',
  styleUrl: './modal-update-spent.component.css'
})
export class ModalUpdateSpentComponent {
    tipos = Object.values(SpentType);
  constructor(
    private dialogRef: MatDialogRef<ModalUpdateSpentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateSpent
  ) {}

  onConfirm() {
    this.dialogRef.close(this.data.spent);
  }

  
  onCancel() {
    this.dialogRef.close();
  }
}
