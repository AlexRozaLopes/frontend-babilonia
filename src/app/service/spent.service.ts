import { inject, Injectable } from '@angular/core';
import { Spent } from '../interface/spent';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class SpentService {
  private  http = inject(HttpClient);
  private  toast = inject(ToastService);
  private snack = inject(MatSnackBar)
  
  constructor() { }
  
  findAll(): Observable<Spent[]> {
    return this.http.get<Spent[]>('/spent/all').pipe(
      catchError(err => {
        this.toast.showGenericMessage("Error ao encontrar Spent",Action.SAIR);
        return of([]);
      })
    );
  }
  findSpentById(id: string): Observable<Spent | undefined> {
    return this.http.get<Spent>(`/spent/${id}`).pipe(
      catchError(err => {
        this.snack.open('Erro ao buscar o gasto', 'Fechar', { duration: 3000 });
        return of(undefined);
      })
    );
  }

  addSpent(spent: Spent): Observable<Spent> {
    return this.http.post<Spent>('/spent', spent).pipe(
      catchError(err => {
        this.snack.open('Erro ao adicionar gasto', 'Fechar', { duration: 3000 });
        return of(spent);
      })
    );
  }

  // Atualizar despesa
  updateSpent(spent: Spent, id: string): Observable<Spent> {
    return this.http.put<Spent>(`/spent/${id}`, spent).pipe(
      catchError(err => {
        this.snack.open('Erro ao atualizar gasto', 'Fechar', { duration: 3000 });
        return of(spent);
      })
    );
  }

  // Deletar despesa
  deleteSpent(id: string): Observable<any> {
    return this.http.delete(`/spent/${id}`).pipe(
      catchError(err => {
        this.snack.open('Erro ao deletar gasto', 'close', { duration: 3000 });
        return of(undefined);
      })
    );
  }
}