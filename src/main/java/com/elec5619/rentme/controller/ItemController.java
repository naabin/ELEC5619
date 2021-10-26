package com.elec5619.rentme.controller;

import com.elec5619.rentme.controller.exceptions.ResourceNotFoundException;
import com.elec5619.rentme.entities.Image;
import com.elec5619.rentme.entities.Item;
import com.elec5619.rentme.entities.User;
import com.elec5619.rentme.service.ImageService;
import com.elec5619.rentme.service.ItemService;
import com.elec5619.rentme.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {
    private final Logger LOGGER = LoggerFactory.getLogger(ItemController.class);
    private final ItemService itemService;
    private final UserService<User> userService;
    private final ImageService imageService;

    @Autowired
    public ItemController(ItemService itemService, UserService<User> userService, ImageService imageService) {
        this.itemService = itemService;
        this.userService = userService;
        this.imageService = imageService;
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
        Item item = this.itemService.findById(id).orElseThrow(() -> new ResourceNotFoundException(id + " does not exist"));
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

    @PostMapping("/upload-image/{itemId}")
    public ResponseEntity<?> uploadImage(@PathVariable("itemId")Long id, @RequestParam("file0")MultipartFile file) throws ResourceNotFoundException, IOException {
        Item item = this.itemService.findById(id).orElseThrow(() -> new ResourceNotFoundException("Item with " + id + " does not exist"));
        Image image = new Image();
        image.setImageItem(item);
        image.setName(file.getOriginalFilename());
        image.setType(file.getContentType());
        LOGGER.info("Original file size in bytes: " + file.getBytes().length);
        image.setImageBytes(file.getBytes());
        Image uploadedImage = this.imageService.save(image);
//        item.addImage(uploadedImage);
//        Item updatedItem = this.itemService.update(item);
        return ResponseEntity.ok().body(uploadedImage);
    }
}
