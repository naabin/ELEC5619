package com.elec5619.rentme.repos;

import com.elec5619.rentme.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUsername(String name);
    Optional<User> findUserById(Long id);
    Optional<User> findUserByEmail(String email);
}
