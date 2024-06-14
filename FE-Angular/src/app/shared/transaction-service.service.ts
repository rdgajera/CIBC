import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { TransactionElement } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  TRANSACTION_DATA: Array<TransactionElement> = []

  private BE_URL = environment.BE_URL;
  private BE_Route = '/transactions'
  constructor(private http: HttpClient) { }


  getAllTransactions() {
    return this.http.get(this.BE_URL + this.BE_Route)
  }

  getAllData() {
    return this.TRANSACTION_DATA;
  }


  setAllTransactions(transactions: Array<TransactionElement>) {
    this.TRANSACTION_DATA = transactions
  }

  getTransactionByID(id: string) {
    return this.TRANSACTION_DATA.find(transaction => transaction._id === id)
  }

  updateTransaction(id: string, comment: string) {
    return this.http.put(this.BE_URL + this.BE_Route, { comments: comment }, { params: { id: id } });
  }

  findOneAndReplace(newData: TransactionElement) {
    const idx = this.TRANSACTION_DATA.findIndex(transaction => transaction._id === newData._id)
    this.TRANSACTION_DATA[idx] = newData
  }

}
