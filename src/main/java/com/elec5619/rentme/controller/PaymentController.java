package com.elec5619.rentme.controller;


import com.elec5619.rentme.controller.exceptions.ResourceNotFoundException;
import com.elec5619.rentme.entities.Item;
import com.elec5619.rentme.service.ItemService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final ItemService itemService;

    @Autowired
    public PaymentController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecret;
    }

    @Value("${stripe.api_key}")
    private String stripeSecret;

    @PostMapping("/process/{itemId}")
    public ResponseEntity<?> processPayment(@RequestBody String stripeToken, @PathVariable("itemId") Long itemId) throws ResourceNotFoundException, StripeException {
        Item item = this.itemService.findById(itemId).orElseThrow(() -> new ResourceNotFoundException("Could not find the item"));
        Double price = item.getItemPrice();
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int)(price * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", "tok_visa");
        Charge requestedCharge = Charge.create(chargeParams);
        return ResponseEntity.ok().body(requestedCharge.getAmount());
    }
}
