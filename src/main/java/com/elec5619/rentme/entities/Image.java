package com.elec5619.rentme.entities;

import javax.persistence.*;

@Entity
@Table(name = "image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private String type;

    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] imageBytes;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Item imageItem;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getImageBytes() {
        return imageBytes;
    }

    public void setImageBytes(byte[] imageBytes) {
        this.imageBytes = imageBytes;
    }

    public Item getImageItem() {
        return imageItem;
    }

    public void setImageItem(Item imageItem) {
        this.imageItem = imageItem;
    }
}
