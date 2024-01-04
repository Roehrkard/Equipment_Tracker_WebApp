// check-in-out.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model'; 
import { ExtendedEquipment } from '../models/extended-equipment.model'; 

@Injectable({
  providedIn: 'root'
})
export class CheckInOutService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  checkoutEquipment(username: string, equipmentId: number, quantity: number): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/checkout`, {
      username,
      equipmentId,
      quantity
    });
  }

  checkinEquipment(userId: number, equipmentId: number, quantity: number): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/checkin`, {
      userId,
      equipmentId,
      quantity
    });
  }

  // toggleEquipmentStatus(equipmentId: number): Observable<ExtendedEquipment> {
  //   return this.http.put<ExtendedEquipment>(`${this.apiUrl}/equipment/${equipmentId}/status`, null);
  // }
}
