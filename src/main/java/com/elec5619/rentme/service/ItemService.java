package com.elec5619.rentme.service;

import com.elec5619.rentme.entities.Item;
import com.elec5619.rentme.entities.ItemInformation;
import com.elec5619.rentme.repos.ItemInformationRepository;
import com.elec5619.rentme.repos.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService  implements GeneralService<Item> {

    private final ItemRepository itemRepository;
    private final ItemInformationRepository itemInformationRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository, ItemInformationRepository itemInformationRepository) {
        this.itemRepository = itemRepository;
        this.itemInformationRepository = itemInformationRepository;
    }

    @Override
    public Item save(Item item) {
        if (item.getItemDescription() != null) {
            ItemInformation itemInformation =  this.itemInformationRepository.save(item.getItemInformation());
            item.setItemInformation(itemInformation);
        }
        return this.itemRepository.save(item);
    }

    @Override
    public Optional<Item> findById(Long id) {
        return this.itemRepository.findById(id);
    }

    @Override
    public List<Item> getAll() {
        return this.itemRepository.findAll();
    }

    @Override
    public Item update(Item item) {
        return this.itemRepository.saveAndFlush(item);
    }

    @Override
    public void delete(Long id) {
        this.itemRepository.deleteById(id);
    }

    public List<Item> getAllUserItems(Long lenderId) {
        return this.itemRepository.findAllByLender(lenderId);
    }

    public List<Item> getAllItemByName(String query) {
        return this.itemRepository.findItemsByItemNameLike(query);
    }
}
