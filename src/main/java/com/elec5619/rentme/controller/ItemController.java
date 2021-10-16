package com.elec5619.rentme.controller;

import com.elec5619.rentme.controller.exceptions.ResourceNotFoundException;
import com.elec5619.rentme.entities.Item;
import com.elec5619.rentme.entities.User;
import com.elec5619.rentme.service.ItemService;
import com.elec5619.rentme.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;
    private final UserService<User> userService;

    @Autowired
    public ItemController(ItemService itemService, UserService<User> userService) {
        this.itemService = itemService;
        this.userService = userService;
    }

    @PostMapping("create/{user-id}")
    public ResponseEntity<?> createItem(@Valid @RequestBody Item item, @PathVariable("user-id") Long lenderId) {
        User user = this.userService.findUserById(lenderId).orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
        item.setLender(user);
        Item createItem  = this.itemService.save(item);
        return ResponseEntity.ok().body(createItem);
    }

    @PostMapping("update/{user-id}")
    public ResponseEntity<?> updateItem(@Valid @RequestBody Item item, @PathVariable("user-id")Long lenderId) {
        User user = this.userService.findUserById(lenderId).orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
        item.setLender(user);
        Item updatedItem = this.itemService.update(item);
        return ResponseEntity.ok().body(updatedItem);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getItemByItemId(@PathVariable("id")Long id) throws ResourceNotFoundException {
        Item item = this.itemService.findById(id).orElseThrow(() -> new ResourceNotFoundException(id + "does not exist"));
        return ResponseEntity.ok().body(item);
    }

    @GetMapping("/lender-items/{id}")
    public ResponseEntity<?> getAllItemsByLenderId(@PathVariable("id") Long lenderId) {
        this.userService.findUserById(lenderId).orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
        List<Item> items = this.itemService.getAllUserItems(lenderId);
        return ResponseEntity.ok().body(items);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteItemById(@PathVariable("id")Long id) {
        this.itemService.delete(id);
        return ResponseEntity.ok().body(ResponseEntity.noContent());
    }
}
