package com.elec5619.rentme.service;


import com.elec5619.rentme.entities.RentedItem;
import com.elec5619.rentme.repos.RentedItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentedItemService implements GeneralService<RentedItem> {

    private final RentedItemRepository rentedItemRepository;

    @Autowired
    public RentedItemService(RentedItemRepository rentedItemRepository) {
        this.rentedItemRepository = rentedItemRepository;
    }

    @Override
    public RentedItem save(RentedItem rentedItem) {
        return this.rentedItemRepository.save(rentedItem);
    }

    @Override
    public Optional<RentedItem> findById(Long id) {
        return this.rentedItemRepository.findById(id);
    }

    @Override
    public List<RentedItem> getAll() {
        return this.rentedItemRepository.findAll();
    }

    @Override
    public RentedItem update(RentedItem rentedItem) {
        return this.rentedItemRepository.saveAndFlush(rentedItem);
    }

    @Override
    public void delete(Long id) {
        this.rentedItemRepository.deleteById(id);
    }
}
