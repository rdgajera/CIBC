import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionServiceService } from '../shared/transaction-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransactionElement } from '../shared/transaction';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss'
})
export class TransactionDetailComponent {

  transaction!: TransactionElement;
  transactionId!: string;
  date!: string;

  transactionServices = inject(TransactionServiceService);

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // this.transaction = {};
      if (params['id']) {
        const retivedData = this.transactionServices.getTransactionByID(params['id']);
        if (retivedData) {
          this.transaction = retivedData
          this.transactionId = params['id'];
          // Setting the initial values of form control
          this.transactionForm.patchValue({ comments: this.transaction.Comments });

        } else {
          this.router.navigateByUrl('/');
        }
      }
    })
  }

  transactionForm = new FormGroup({
    comments: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')])
  })

  transactionFormSubmit() {
    if (this.transactionForm.value.comments) {
      this.transactionServices.updateTransaction(this.transactionId, this.transactionForm.value.comments).subscribe((res: any) => {
        if (res) {
          this.transactionServices.findOneAndReplace(res)
          this.router.navigateByUrl('/');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}
