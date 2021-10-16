package com.elec5619.rentme.service;

import com.elec5619.rentme.entities.User;
import com.elec5619.rentme.entities.UserRole;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserService<T extends User> extends UserDetailsService {
    T createUser(T user, Set<UserRole> userRoles);
    T updateUser(T user, Set<UserRole> userRoles);
    Optional<T> findUserById(Long id);
    Optional<T> findUserByEmail(String email);
    Optional<T> findUserByUsername(String username);
    List<T> getAllUsers();
    void deleteUserById(String id);
    @Override
    UserDetails loadUserByUsername(String s) throws UsernameNotFoundException;
}
