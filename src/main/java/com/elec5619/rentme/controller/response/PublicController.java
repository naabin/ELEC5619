package com.elec5619.rentme.controller.response;

import com.elec5619.rentme.entities.Item;
import com.elec5619.rentme.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private ItemService itemService;

    @Autowired
    public PublicController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/items/get-all")
    public ResponseEntity<?> getAllItemsByName(@RequestParam(name = "search") String searchQuery) {
        List<Item> searchedResults = this.itemService.getAllItemByName(searchQuery);
        return ResponseEntity.ok().body(searchedResults);
    }

    @GetMapping("/items/advance-search")
//    String category, Integer maxPrice, int minimumRating
    public ResponseEntity<?> advanceSearch(@RequestParam("category") String category,
                                           @RequestParam("maxPrice") Double maxPrice,
                                           @RequestParam("minimumRating")Integer minimumRating) {
        List<Item> items =  this.itemService.getAdvancedSearch(category, maxPrice, minimumRating);
        return ResponseEntity.ok().body(items);
    }
}
