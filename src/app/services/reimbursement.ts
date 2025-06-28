import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reimbursement {
  id?: string;
  nom: string;
  motif: string;
  montant: number;
  lieu: string;
  justificatif: string;
  statut: 'en_attente' | 'validé' | 'refusé';
  dateCreation: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {
  private apiUrl = 'http://localhost:3000/api/reimbursements';

  constructor(private http: HttpClient) {}

  // Créer une nouvelle demande de remboursement
  createReimbursement(reimbursement: Partial<Reimbursement>): Observable<Reimbursement> {
    return this.http.post<Reimbursement>(this.apiUrl, reimbursement);
  }

  // Récupérer toutes les demandes
  getReimbursements(): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>(this.apiUrl);
  }

  // Récupérer une demande spécifique
  getReimbursement(id: string): Observable<Reimbursement> {
    return this.http.get<Reimbursement>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour le statut d'une demande
  updateReimbursementStatus(id: string, statut: Reimbursement['statut']): Observable<Reimbursement> {
    return this.http.patch<Reimbursement>(`${this.apiUrl}/${id}`, { statut });
  }
}
