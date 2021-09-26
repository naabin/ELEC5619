package com.elec5619.rentme.service;

import com.elec5619.rentme.config.PasswordEncrypt;
import com.elec5619.rentme.entities.Renter;
import com.elec5619.rentme.entities.UserRole;
import com.elec5619.rentme.repos.RenterRepository;
import com.elec5619.rentme.repos.UserRoleRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RenterService implements UserService<Renter>{
    private final RenterRepository renterRepository;
    private final UserRoleRepository roleRepository;
    private final PasswordEncrypt encryptPassword;

    public RenterService(RenterRepository renterRepository, UserRoleRepository roleRepository, PasswordEncrypt encryptPassword) {
        this.renterRepository = renterRepository;
        this.roleRepository = roleRepository;
        this.encryptPassword = encryptPassword;
    }

    @Override
    public Renter createUser(Renter user, Set<UserRole> userRoles) {
        Optional<Renter> renter = this.renterRepository.findRenterByEmail(user.getEmail());
        if (renter.isPresent()) {
            System.out.println("User with " + user.getEmail() + " already exist");
            return renter.get();
        }
        user.setPassword(encryptPassword.passwordEncoder().encode(user.getPassword()));
        user.setUsername(user.getUsername().toLowerCase());
        for (UserRole role: userRoles) this.roleRepository.save(role);
        user.getUserRoles().addAll(userRoles);
        return this.renterRepository.save(user);
    }

    @Override
    public Renter updateUser(Renter user, Set<UserRole> userRoles) {
        userRoles.forEach(this.roleRepository::saveAndFlush);
        user.getUserRoles().addAll(userRoles);
        return this.renterRepository.saveAndFlush(user);
    }

    @Override
    public Optional<Renter> findUserById(String id) {
        return this.renterRepository.findById(id);
    }

    @Override
    public Optional<Renter> findUserByEmail(String email) {
        return this.renterRepository.findRenterByEmail(email);
    }

    @Override
    public List<Renter> getAllUsers() {
        return this.renterRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Renter lender = this.renterRepository.findRenterByUsername(s)
                .orElseThrow(() -> new UsernameNotFoundException(s + " does not seem to exist"));
        List<GrantedAuthority> authorities = (List<GrantedAuthority>) lender.getAuthorities();
        return new User(lender.getUsername(), lender.getPassword(), lender.isEnabled(),
                lender.isAccountNonExpired(), lender.isCredentialsNonExpired(), lender.isAccountNonLocked(), authorities);
    }
}
