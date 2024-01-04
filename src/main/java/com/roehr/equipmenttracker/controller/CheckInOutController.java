package com.roehr.equipmenttracker.controller;

import com.roehr.equipmenttracker.model.Equipment;
import com.roehr.equipmenttracker.model.Transaction;
import com.roehr.equipmenttracker.service.CheckInOutService;
import com.roehr.equipmenttracker.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
public class CheckInOutController {

    private static final Logger logger = LoggerFactory.getLogger(CheckInOutController.class);

    @Autowired
    private CheckInOutService checkInOutService;

    @Autowired
    private EquipmentService equipmentService;

    @PostMapping("/checkout")
    public ResponseEntity<Transaction> checkoutEquipment(@RequestBody CheckoutCheckinRequest request) {
        logger.info("Checkout request - Username: {}, Equipment ID: {}, Quantity: {}",
                request.getUsername(), request.getEquipmentId(), request.getQuantity());

        Transaction transaction = checkInOutService.checkoutEquipment(request.getUsername(), request.getEquipmentId(), request.getQuantity());

        Equipment equipment = equipmentService.findById(request.getEquipmentId());

        if (equipment != null) {
            int updatedQty = equipment.getQty() - request.getQuantity();

            equipmentService.updateEquipmentQuantity(request.getEquipmentId(), updatedQty);

            if (updatedQty == 0) {
                equipmentService.updateEquipmentStatus(request.getEquipmentId(), "Unavailable");
            }

            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/checkin")
    public ResponseEntity<Transaction> checkinEquipment(@RequestBody CheckoutCheckinRequest request) {
        Transaction transaction = checkInOutService.checkinEquipment(request.getUserId(), request.getEquipmentId(), request.getQuantity());

        Equipment equipment = equipmentService.updateEquipmentStatus(request.getEquipmentId(), "Available");

        if (equipment != null) {
            int newQty = equipment.getQty() + request.getQuantity();

            equipmentService.updateEquipmentQuantity(request.getEquipmentId(), newQty);

            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    // Static inner class for request body
    static class CheckoutCheckinRequest {
        private Long userId;
        private String username;
        private Long equipmentId;
        private int quantity;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public Long getEquipmentId() {
            return equipmentId;
        }

        public void setEquipmentId(Long equipmentId) {
            this.equipmentId = equipmentId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }
}
