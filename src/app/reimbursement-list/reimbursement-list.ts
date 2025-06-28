import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { ReimbursementService, Reimbursement } from '../services/reimbursement';

@Component({
  selector: 'app-reimbursement-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule
  ],
  template: `
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="reimbursements" matSort>
        <!-- Nom Column -->
        <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Nom </th>
          <td mat-cell *matCellDef="let element"> {{element.nom}} </td>
        </ng-container>

        <!-- Motif Column -->
        <ng-container matColumnDef="motif">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Motif </th>
          <td mat-cell *matCellDef="let element"> {{element.motif}} </td>
        </ng-container>

        <!-- Montant Column -->
        <ng-container matColumnDef="montant">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Montant </th>
          <td mat-cell *matCellDef="let element"> {{element.montant | currency:'EUR'}} </td>
        </ng-container>

        <!-- Lieu Column -->
        <ng-container matColumnDef="lieu">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Lieu </th>
          <td mat-cell *matCellDef="let element"> {{element.lieu}} </td>
        </ng-container>

        <!-- Statut Column -->
        <ng-container matColumnDef="statut">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Statut </th>
          <td mat-cell *matCellDef="let element">
            <mat-chip [color]="getStatusColor(element.statut)" selected>
              {{element.statut}}
            </mat-chip>
          </td>
        </ng-container>

        <!-- Date Column -->
        <ng-container matColumnDef="dateCreation">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
          <td mat-cell *matCellDef="let element"> {{element.dateCreation | date}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator [pageSizeOptions]="[5, 10, 20]"
                     showFirstLastButtons
                     aria-label="Select page of reimbursements">
      </mat-paginator>
    </div>
  `,
  styles: [`
    table {
      width: 100%;
    }
    
    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }
    
    .mat-mdc-chip {
      min-height: 24px;
    }
  `]
})
export class ReimbursementListComponent implements OnInit {
  reimbursements: Reimbursement[] = [];
  displayedColumns: string[] = ['nom', 'motif', 'montant', 'lieu', 'statut', 'dateCreation'];

  constructor(private reimbursementService: ReimbursementService) {}

  ngOnInit() {
    this.loadReimbursements();
  }

  loadReimbursements() {
    this.reimbursementService.getReimbursements()
      .subscribe({
        next: (data) => {
          this.reimbursements = data;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des remboursements', error);
        }
      });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'validé':
        return 'primary';
      case 'refusé':
        return 'warn';
      default:
        return 'accent';
    }
  }
} 