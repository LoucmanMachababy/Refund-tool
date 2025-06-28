import { Routes } from '@angular/router';
import { ReimbursementFormComponent } from './reimbursement-form/reimbursement-form';
import { ReimbursementListComponent } from './reimbursement-list/reimbursement-list';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ReimbursementListComponent },
  { path: 'new', component: ReimbursementFormComponent }
];
