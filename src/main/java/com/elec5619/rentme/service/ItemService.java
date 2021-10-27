package com.elec5619.rentme.service;

import com.elec5619.rentme.entities.Address;
import com.elec5619.rentme.entities.Item;
import com.elec5619.rentme.entities.ItemInformation;
import com.elec5619.rentme.entities.User;
import com.elec5619.rentme.repos.ItemInformationRepository;
import com.elec5619.rentme.repos.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        return this.itemRepository.findItemsByLenderId(lenderId);
    }

    public List<Item> getAllItemByName(String query) {
        return this.itemRepository.findItemsByItemNameLike(query);
    }

    public List<Item> getItemsNearby(User user) {
        List<Item> items = getAll();
        List<Item> filteredByDistanceItems = new ArrayList<>();
        items.forEach(i -> {
            if (latLngToDistance(user.getAddress(), i.getLender().getAddress()) <= 50) {
                filteredByDistanceItems.add(i);
            }
        });
        return filteredByDistanceItems;
    }

    private double latLngToDistance(Address address1, Address address2) {
        double dLat = Math.toRadians(address2.getLat() - address1.getLat());
        double dLng = Math.toRadians(address2.getLng() - address1.getLng());
        double a = Math.pow(Math.sin(dLat/2), 2) + Math.cos(Math.toRadians(address1.getLat()))
                 * Math.cos(Math.toRadians(address2.getLat()))
                 * Math.pow(Math.sin(dLng/2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return 6371 * c;
    }
}
