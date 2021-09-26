package com.elec5619.rentme.entities;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "renter")
public class Renter extends User {

    @OneToMany(mappedBy = "renter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RentedItem> rentedItems = new ArrayList<>();

}
