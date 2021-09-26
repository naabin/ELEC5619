package com.elec5619.rentme.repos;

import com.elec5619.rentme.entities.Lender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LenderRepository extends JpaRepository<Lender, String> {
    Optional<Lender> findLenderByEmail(String email);
    Optional<Lender> findLenderByUsername(String name);
}
