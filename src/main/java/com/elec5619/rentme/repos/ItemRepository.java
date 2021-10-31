package com.elec5619.rentme.repos;

import com.elec5619.rentme.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository  extends JpaRepository<Item, Long> {
    List<Item> findItemsByLenderId(Long lenderId);
    @Query("SELECT i FROM Item i WHERE i.itemName LIKE %:searchQuery%")
    List<Item> findItemsByItemNameLike(String searchQuery);

    @Query("SELECT i FROM Item i inner JOIN ItemInformation info on i.itemInformation.id = info.id where i.category like %:category% or i.itemPrice > :maxPrice or i.rating >= :minimumRating")
    List<Item> searchItems(String category, Double maxPrice, int minimumRating);

//    List<Item> getItemByCategoryOrItemInformationAndItemPriceOr
}
