package com.elec5619.rentme.service;

import com.elec5619.rentme.config.PasswordEncrypt;
import com.elec5619.rentme.entities.User;
import com.elec5619.rentme.entities.UserRole;
import com.elec5619.rentme.repos.UserRepository;
import com.elec5619.rentme.repos.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MyUserDetailsService implements UserService<User> {

    private final UserRepository userRepository;
    private final UserRoleRepository roleRepository;
    private final PasswordEncrypt passwordEncrypt;

    @Autowired
    public MyUserDetailsService(UserRepository repository, PasswordEncrypt passwordEncrypt, UserRoleRepository roleRepository) {
        this.passwordEncrypt = passwordEncrypt;
        this.userRepository = repository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User createUser(User user, Set<UserRole> userRoles) {
        Optional<User> existingUser = this.userRepository.findUserByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            System.out.println("User already exist with username + " + user.getUsername());
            return existingUser.get();
        }
        user.setPassword(passwordEncrypt.passwordEncoder().encode(user.getPassword()));
        user.setUsername(user.getUsername().toLowerCase());
        for (UserRole role: userRoles) this.roleRepository.save(role);
        user.getUserRoles().addAll(userRoles);
        return this.userRepository.save(user);
    }

    @Override
    public User updateUser(User user, Set<UserRole> userRoles) {
        userRoles.forEach(this.roleRepository::saveAndFlush);
        user.getUserRoles().addAll(userRoles);
        return this.userRepository.saveAndFlush(user);
    }

    @Override
    public Optional<User> findUserById(String id) {
        return this.userRepository.findUserById(id);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return this.userRepository.findUserByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = this.userRepository.findUserByUsername(s).orElseThrow(() -> new UsernameNotFoundException("User" +
                "with " + s + " not found."));
        List<GrantedAuthority> authorities = (List<GrantedAuthority>) user.getAuthorities();
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.isEnabled(),
                user.isAccountNonExpired(), user.isCredentialsNonExpired(), user.isAccountNonLocked(), authorities);
    }
}
