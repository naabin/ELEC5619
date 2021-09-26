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

@Service
public interface UserService<T extends User> extends UserDetailsService {
    T createUser(T user, Set<UserRole> userRoles);
    T updateUser(T user, Set<UserRole> userRoles);
    Optional<T> findUserById(String id);
    Optional<T> findUserByEmail(String email);
    List<T> getAllUsers();
    @Override
    UserDetails loadUserByUsername(String s) throws UsernameNotFoundException;
}
