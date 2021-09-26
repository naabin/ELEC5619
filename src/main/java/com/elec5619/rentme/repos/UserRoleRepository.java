package com.elec5619.rentme.repos;

import com.elec5619.rentme.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, String> {
    UserRole findUserRoleByRole(String role);
}
