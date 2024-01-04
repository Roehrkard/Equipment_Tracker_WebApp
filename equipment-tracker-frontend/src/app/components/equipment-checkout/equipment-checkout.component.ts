import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtendedEquipment } from '../../models/extended-equipment.model';
import { EquipmentService } from '../../services/equipment.service';
import { UserService } from '../../services/user.service';
import { CheckInOutService } from '../../services/check-in-out.service';

@Component({
  selector: 'app-equipment-checkout',
  templateUrl: './equipment-checkout.component.html',
  styleUrls: ['./equipment-checkout.component.css']
})
export class EquipmentCheckoutComponent implements OnInit {
  equipments: ExtendedEquipment[] = [];
  isCheckoutValid: boolean = false;
  alertMessage: string = ''; 
  alertType: string = ''; 

  constructor(
    private equipmentService: EquipmentService,
    private userService: UserService,
    private checkInOutService: CheckInOutService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadAllEquipment();
  }

  loadAllEquipment(): void {
    this.equipmentService.getAllEquipment().subscribe({
      next: (data) => {
        this.equipments = data.map(equipment => ({
          ...equipment,
          selectedQty: 0
        }));
      },
      error: (error) => {
        console.error('Error fetching equipment:', error);
        this.showAlert('Error fetching equipment', 'error');
      }
    });
  }

  validateCheckout(): void {
    this.isCheckoutValid = this.equipments.some(equipment => equipment.selectedQty > 0);
  }

  checkout(): void {
    this.validateCheckout();
    if (!this.isCheckoutValid) {
      this.showAlert('Please select at least one item to checkout', 'error');
      return;
    }
    this.userService.getUsername().subscribe((username) => {
      if (username) {
        this.equipments.forEach(equipment => {
          if (equipment.selectedQty > 0) {
            console.log(`Checking out equipment - Username: ${username}, Equipment ID: ${equipment.id}, Selected Quantity: ${equipment.selectedQty}`);
            this.checkInOutService.checkoutEquipment(username, equipment.id, equipment.selectedQty).subscribe({
              next: (transaction) => {
                console.log('Checkout successful:', transaction);
                this.loadAllEquipment(); 
                this.router.navigate(['/checked-out-equipment']).then(() => {
                  // Use a shared service or other method to pass the success message to the component
                 
                });
              },
              error: (error) => {
                console.error('Error during checkout:', error);
                this.showAlert('Error during checkout', 'error');
              }
            });
          }
        });
      }
    });
  }

  private showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => this.alertMessage = '', 3000); 
  }
}
