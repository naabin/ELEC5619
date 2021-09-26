package com.elec5619.rentme.repos;

import com.elec5619.rentme.entities.Renter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RenterRepository extends JpaRepository<Renter, String> {
    Optional<Renter> findRenterByEmail(String email);
    Optional<Renter> findRenterByUsername(String name);
}
