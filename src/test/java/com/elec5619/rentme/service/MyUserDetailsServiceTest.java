package com.elec5619.rentme.service;

import com.elec5619.rentme.entities.User;
import junit.framework.TestCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;

@SpringBootTest
public class MyUserDetailsServiceTest extends TestCase {
    @Autowired
    private UserService<User> userService;
    public void testCreateUser() {
        User user = new User();
        user.setName("User");
    }

    public void testUpdateUser() {
    }

    public void testFindUserById() {
    }

    public void testFindUserByEmail() {
    }

    public void testFindUserByUsername() {
    }

    public void testGetAllUsers() {
    }

    public void testDeleteUserById() {
    }

    public void testLoadUserByUsername() {
    }
}