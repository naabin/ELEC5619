package com.elec5619.rentme.entities;

import javax.persistence.*;

@Entity
@Table(name = "item_information")
public class ItemInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String brand;
    @Column
    private String modelNumber;
    @Column
    private String serialNumber;
    @Column
    private String itemCondition;
    @Column
    private Double rentalPricePerDay;
    @Column
    private Double rentalPricePerWeek;
    @Column
    private Double rentalPricePerMonth;
    @Column
    private Integer yearPurchased;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModelNumber() {
        return modelNumber;
    }

    public void setModelNumber(String modelNumber) {
        this.modelNumber = modelNumber;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Double getRentalPricePerDay() {
        return rentalPricePerDay;
    }

    public void setRentalPricePerDay(Double rentalPricePerDay) {
        this.rentalPricePerDay = rentalPricePerDay;
    }

    public Double getRentalPricePerWeek() {
        return rentalPricePerWeek;
    }

    public void setRentalPricePerWeek(Double rentalPricePerWeek) {
        this.rentalPricePerWeek = rentalPricePerWeek;
    }

    public Double getRentalPricePerMonth() {
        return rentalPricePerMonth;
    }

    public void setRentalPricePerMonth(Double rentalPricePerMonth) {
        this.rentalPricePerMonth = rentalPricePerMonth;
    }

    public String getItemCondition() {
        return itemCondition;
    }

    public void setItemCondition(String itemCondition) {
        this.itemCondition = itemCondition;
    }

    public Integer getYearPurchased() {
        return yearPurchased;
    }

    public void setYearPurchased(Integer yearPurchased) {
        this.yearPurchased = yearPurchased;
    }
}
