package com.elec5619.rentme.entities;

import javax.persistence.*;

@Entity
@Table(name = "complaint")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item complainedItem;

    @OneToOne
    @JoinColumn(name = "lender_id")
    private Lender lender;

    @Column
    private String complaint;

    public String getId() {
        return id;
    }

    public void setId(String complaintId) {
        this.id = complaintId;
    }

    public Item getComplainedItem() {
        return complainedItem;
    }

    public void setComplainedItem(Item complainedItem) {
        this.complainedItem = complainedItem;
    }

    public Lender getLender() {
        return lender;
    }

    public void setLender(Lender lender) {
        this.lender = lender;
    }

    public String getComplaint() {
        return complaint;
    }

    public void setComplaint(String complaint) {
        this.complaint = complaint;
    }
}
