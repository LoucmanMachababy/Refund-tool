import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field';
import { ReimbursementService } from '../services/reimbursement';

@Component({
  selector: 'app-reimbursement-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatError
  ],
  templateUrl: './reimbursement-form.html',
  styleUrls: ['./reimbursement-form.css']
})
export class ReimbursementFormComponent {
  reimbursementForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private reimbursementService: ReimbursementService,
    private snackBar: MatSnackBar
  ) {
    this.reimbursementForm = this.fb.group({
      nom: ['', Validators.required],
      motif: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      lieu: ['', Validators.required],
      justificatif: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.reimbursementForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      this.reimbursementService.createReimbursement(this.reimbursementForm.value)
        .subscribe({
          next: (response) => {
            console.log('Remboursement envoyé avec succès', response);
            this.snackBar.open('Demande de remboursement envoyée avec succès', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.reimbursementForm.reset();
          },
          error: (error) => {
            console.error('Erreur lors de l\'envoi', error);
            this.snackBar.open('Erreur lors de l\'envoi de la demande', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
    }
  }
}
