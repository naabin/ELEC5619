package com.elec5619.rentme.service;

import java.util.List;
import java.util.Optional;

public interface GeneralService<T> {
    T save(T t);
    Optional<T> findById(Long id);
    List<T> getAll();
    T update(T t);
    void delete(Long id);
}
