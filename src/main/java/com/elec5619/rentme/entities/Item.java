package com.elec5619.rentme.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @ManyToOne
    @JoinColumn
    private Lender lender;

    @Column
    @NotNull
    private String itemName;

    @Column
    private String itemDescription;

    @Column
    private Boolean available = true;

    @Column
    private LocalDate availableFrom;

    @Column
    @NotNull
    private Double itemPrice;

    @OneToMany(mappedBy = "complainedItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private final List<Complaint> complaints = new ArrayList<>();

    @OneToMany(mappedBy = "rentedItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private final List<RentedItem> rentedItems = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String itemId) {
        this.id = itemId;
    }

    public Lender getLender() {
        return lender;
    }

    public void setLender(Lender lender) {
        this.lender = lender;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public LocalDate getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(LocalDate availableFrom) {
        this.availableFrom = availableFrom;
    }

    public Double getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(Double itemPrice) {
        this.itemPrice = itemPrice;
    }

    public List<Complaint> getComplaints() {
        return complaints;
    }

    public List<RentedItem> getRentedItems() {
        return rentedItems;
    }
}