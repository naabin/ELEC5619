package com.elec5619.rentme.repos;

import com.elec5619.rentme.entities.ItemInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemInformationRepository extends  JpaRepository<ItemInformation, Long> {
}
