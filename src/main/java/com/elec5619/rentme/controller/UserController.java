package com.elec5619.rentme.controller;

import com.elec5619.rentme.config.PasswordEncrypt;
import com.elec5619.rentme.entities.User;
import com.elec5619.rentme.entities.UserRole;
import com.elec5619.rentme.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService<User> userService;
    private final PasswordEncrypt passwordEncrypt;


    @Autowired
    public UserController(UserService<User> userService, PasswordEncrypt passwordEncrypt) {
        this.userService = userService;
        this.passwordEncrypt = passwordEncrypt;
    }

    @PostMapping("/lender")
    public ResponseEntity<?> lenderRegistration(@Valid @RequestBody User user) {
        User newUser = createUser(user, "ROLE_LENDER");
        return ResponseEntity.ok().body(newUser);
    }

    @PostMapping("/renter")
    public ResponseEntity<?> renterRegistration(@Valid @RequestBody User user) {
        User newUser = createUser(user, "ROLE_RENTER");
        return ResponseEntity.ok().body(newUser);
    }

    private User createUser(User user, String userRole) {
        HashSet<UserRole> roles = new HashSet<>();
        UserRole role = new UserRole();
        role.setRole(userRole);
        roles.add(role);
        user.setUserRoles(roles);
        User newUser = this.userService.createUser(user, roles);
        return newUser;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        User user = this.userService.findUserById(id).orElseThrow(() -> new UsernameNotFoundException("User with "
                + id + " does not exist"));
        return ResponseEntity.ok().body(user);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable("id") String id) {
        this.userService.deleteUserById(id);
        return ResponseEntity.ok().body("Resource deleted successfully.");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().body("Logget out successfully");
    }

    @PostMapping("/unique-email")
    public ResponseEntity<?> checkUniqueEmail(@RequestParam(name = "email")String email) {
        Optional<User> user = this.userService.findUserByEmail(email);
        return getResponseEntity(user);
    }

    @PostMapping("/unique-user")
    public ResponseEntity<?> checkUniqueUser(@RequestParam(name = "username")String username) {
        Optional<User> user = this.userService.findUserByUsername(username);
        return getResponseEntity(user);
    }

    private ResponseEntity<?> getResponseEntity(Optional<User> user) {
        Map<String, Boolean> userAvailable = new HashMap<>();
        if (!user.isPresent()) {
            userAvailable.put("available", true);
            return ResponseEntity.ok().body(userAvailable);
        }
        userAvailable.put("available", false);
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(userAvailable);
    }
}
