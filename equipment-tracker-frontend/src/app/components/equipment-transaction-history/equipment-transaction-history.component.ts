import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction.model'; 
import { TransactionService } from '../../services/transaction.service'; 

@Component({
  selector: 'app-equipment-transaction-history',
  templateUrl: './equipment-transaction-history.component.html',
  styleUrls: ['./equipment-transaction-history.component.css']
})
export class EquipmentTransactionHistoryComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data.sort((a, b) => {
          return new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime();
        });
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }
}
