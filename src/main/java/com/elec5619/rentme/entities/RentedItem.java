package com.elec5619.rentme.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "rented_item")
public class RentedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @ManyToOne
    @JoinColumn
    private Lender lender;

    @ManyToOne
    @JoinColumn(name = "renter", referencedColumnName = "id")
    private Renter renter;

    @ManyToOne
    @JoinColumn
    private Item rentedItem;

    @Column
    private LocalDate rentedAt;

    @Column
    private LocalDate rentedUntil;

    @Column
    private Boolean overdue;

    @Column
    private Double commission;

    @Column
    private Double agreedPrice;

    public String getId() {
        return id;
    }

    public void setId(String rentedItemId) {
        this.id = rentedItemId;
    }

    public Lender getLender() {
        return lender;
    }

    public void setLender(Lender lender) {
        this.lender = lender;
    }

    public Renter getRenter() {
        return renter;
    }

    public void setRenter(Renter renter) {
        this.renter = renter;
    }

    public Item getRentedItem() {
        return rentedItem;
    }

    public void setRentedItem(Item rentedItem) {
        this.rentedItem = rentedItem;
    }

    public LocalDate getRentedAt() {
        return rentedAt;
    }

    public void setRentedAt(LocalDate rentedFrom) {
        this.rentedAt = rentedFrom;
    }

    public LocalDate getRentedUntil() {
        return rentedUntil;
    }

    public void setRentedUntil(LocalDate rentedTo) {
        this.rentedUntil = rentedTo;
    }

    public Boolean getOverdue() {
        return overdue;
    }

    public void setOverdue(Boolean overdue) {
        this.overdue = overdue;
    }

    public Double getCommission() {
        return commission;
    }

    public void setCommission(Double commission) {
        this.commission = commission;
    }

    public Double getAgreedPrice() {
        return agreedPrice;
    }

    public void setAgreedPrice(Double agreedPrice) {
        this.agreedPrice = agreedPrice;
    }
}
