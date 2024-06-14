import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TransactionServiceService } from '../shared/transaction-service.service';
import { FormsModule } from '@angular/forms';
import { TransactionElement } from '../shared/transaction';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {

  transationService = inject(TransactionServiceService);

  displayedColumns: string[] = ['id', 'date', 'comments', 'action'];
  dataSource!: TransactionElement[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const transactions = this.transationService.getAllData()
    if (!transactions.length) {
      this.transationService.getAllTransactions().subscribe((res: any) => {

        // console.log(res)
        this.dataSource = res
        this.transationService.setAllTransactions(res)
        // console.log(this.TRANSACTION_DATA)
      });
    } else {
      this.dataSource = transactions
    }
  }

  viewDetail(data: TransactionElement) {
    console.log(data)
    this.router.navigateByUrl(`/${data._id}`)
  }

}
