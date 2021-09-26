package com.elec5619.rentme.service;

import com.elec5619.rentme.config.PasswordEncrypt;
import com.elec5619.rentme.entities.Lender;
import com.elec5619.rentme.entities.UserRole;
import com.elec5619.rentme.repos.LenderRepository;
import com.elec5619.rentme.repos.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Primary
public class LenderService implements UserService<Lender> {
    private final LenderRepository lenderRepository;
    private final UserRoleRepository roleRepository;
    private final PasswordEncrypt encryptPassword;

    @Autowired
    public LenderService(LenderRepository lenderRepository, UserRoleRepository userRoleRepository, PasswordEncrypt passwordEncrypt) {
        this.lenderRepository = lenderRepository;
        this.roleRepository = userRoleRepository;
        this.encryptPassword = passwordEncrypt;
    }

    @Override
    public Lender createUser(Lender user, Set<UserRole> userRoles) {
        Lender lender = this.lenderRepository.findLenderByEmail(user.getEmail()).get();
        if (lender != null) {
            System.out.println("User with " + user.getEmail() + " already exist");
            return lender;
        }
        lender.setPassword(encryptPassword.passwordEncoder().encode(lender.getPassword()));
        lender.setUsername(lender.getUsername().toLowerCase());
        for (UserRole role: userRoles) this.roleRepository.save(role);
        lender.getUserRoles().addAll(userRoles);
        return this.lenderRepository.save(lender);
    }

    @Override
    public Lender updateUser(Lender user, Set<UserRole> userRoles) {
        userRoles.forEach(this.roleRepository::saveAndFlush);
        user.getUserRoles().addAll(userRoles);
        return this.lenderRepository.saveAndFlush(user);
    }

    @Override
    public Optional<Lender> findUserById(String id) {
        return this.lenderRepository.findById(id);
    }

    @Override
    public Optional<Lender> findUserByEmail(String email) {
        return this.lenderRepository.findLenderByEmail(email);
    }

    @Override
    public List<Lender> getAllUsers() {
        return this.lenderRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
         Lender lender = this.lenderRepository.findLenderByUsername(s)
                 .orElseThrow(() -> new UsernameNotFoundException(s + " does not seem to exist"));
         List<GrantedAuthority> authorities = (List<GrantedAuthority>) lender.getAuthorities();
         return new User(lender.getUsername(), lender.getPassword(), lender.isEnabled(),
                 lender.isAccountNonExpired(), lender.isCredentialsNonExpired(), lender.isAccountNonLocked(), authorities);
    }
}
