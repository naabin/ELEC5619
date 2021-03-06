package com.elec5619.rentme.entities;

import javax.persistence.*;

@Entity
@Table(name = "complaint")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item complainedItem;

    @OneToOne
    @JoinColumn(name = "lender_id")
    private User lender;

    @OneToOne
    @JoinColumn(name = "renter_id")
    private User renter;



    @Column
    private String complaint;

    public Long getId() {
        return id;
    }

    public void setId(Long complaintId) {
        this.id = complaintId;
    }

    public Item getComplainedItem() {
        return complainedItem;
    }

    public void setComplainedItem(Item complainedItem) {
        this.complainedItem = complainedItem;
    }

    public User getLender() {
        return lender;
    }

    public void setLender(User lender) {
        this.lender = lender;
    }

    public String getComplaint() {
        return complaint;
    }

    public void setComplaint(String complaint) {
        this.complaint = complaint;
    }
}
