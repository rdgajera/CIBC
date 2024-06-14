import { Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: TransactionListComponent
    },
    {
        path: ':id',
        component: TransactionDetailComponent
    }
];
