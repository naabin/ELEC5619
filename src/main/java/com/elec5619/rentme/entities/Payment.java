package com.elec5619.rentme.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    @NotNull
    private String nameOnCard;

    @Column(unique = true)
    @NotNull
    private String cardNumber;

    @Column
    private LocalDate expiryDate;

    public Long getId() {
        return id;
    }

    public void setId(Long paymentId) {
        this.id = paymentId;
    }

    public String getNameOnCard() {
        return nameOnCard;
    }

    public void setNameOnCard(String nameOnCard) {
        this.nameOnCard = nameOnCard;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiryDate() {
        return expiryDate.toString();
    }

    public void setExpiryDate(String date) {
        this.expiryDate = LocalDate.parse(date);
    }
}
