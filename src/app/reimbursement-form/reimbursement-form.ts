import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-reimbursement-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError
  ],
  templateUrl: './reimbursement-form.html',
  styleUrls: ['./reimbursement-form.css']
})
export class ReimbursementFormComponent {
  reimbursementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
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
    if (this.reimbursementForm.valid) {
      this.http.post('/api/reimbursements', this.reimbursementForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('Remboursement envoyé avec succès', response);
            this.reimbursementForm.reset();
          },
          error: (error: any) => {
            console.error('Erreur lors de l\'envoi', error);
          }
        });
    }
  }
}
