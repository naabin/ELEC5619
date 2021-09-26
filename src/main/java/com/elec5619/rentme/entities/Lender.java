package com.elec5619.rentme.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "lender")
@Table
public class Lender extends User{

    @OneToMany(mappedBy = "lender", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Item> items = new ArrayList<>();

    @OneToMany(mappedBy = "lender", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RentedItem> rentedItems = new ArrayList<>();

}
