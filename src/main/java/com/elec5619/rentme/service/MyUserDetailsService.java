package com.elec5619.rentme.service;

import com.elec5619.rentme.config.PasswordEncrypt;
import com.elec5619.rentme.entities.Address;
import com.elec5619.rentme.entities.Payment;
import com.elec5619.rentme.entities.User;
import com.elec5619.rentme.entities.UserRole;
import com.elec5619.rentme.repos.AddressRepository;
import com.elec5619.rentme.repos.PaymentRepository;
import com.elec5619.rentme.repos.UserRepository;
import com.elec5619.rentme.repos.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MyUserDetailsService implements UserService<User> {

    private final UserRepository userRepository;
    private final UserRoleRepository roleRepository;
    private final PasswordEncrypt passwordEncrypt;
    private final AddressRepository addressRepository;
    private final PaymentRepository paymentRepository;

    @Autowired
    public MyUserDetailsService(UserRepository userRepository, UserRoleRepository roleRepository,
                                PasswordEncrypt passwordEncrypt, AddressRepository addressRepository, PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncrypt = passwordEncrypt;
        this.addressRepository = addressRepository;
        this.paymentRepository = paymentRepository;
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
        for (UserRole role: userRoles) {
            this.roleRepository.save(role);
        }
        if (user.getAddress() != null) {
            Address address =  this.addressRepository.save(user.getAddress());
            user.setAddress(address);
        }
        if (user.getPayment() != null) {
            Payment payment = this.paymentRepository.save(user.getPayment());
            user.setPayment(payment);
        }
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
    public Optional<User> findUserById(Long id) {
        return this.userRepository.findUserById(id);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return this.userRepository.findUserByEmail(email);
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return this.userRepository.findUserByUsername(username);
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public void deleteUserById(Long id) {
        this.userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = this.userRepository.findUserByEmail(s).orElseThrow(() -> new UsernameNotFoundException("User" +
                "with " + s + " not found."));
        Set<GrantedAuthority> authorities = (Set<GrantedAuthority>) user.getAuthorities();
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.isEnabled(),
                user.isAccountNonExpired(), user.isCredentialsNonExpired(), user.isAccountNonLocked(), authorities);
    }
}
