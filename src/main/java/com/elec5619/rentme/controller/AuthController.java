package com.elec5619.rentme.controller;

import com.elec5619.rentme.config.JwtTokenUtil;
import com.elec5619.rentme.controller.response.JwtRequest;
import com.elec5619.rentme.entities.User;
import com.elec5619.rentme.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private UserService<User> userService;
    private final JwtTokenUtil tokenUtil;
    private final AuthenticationManager authenticationManager;
    @Autowired
    public AuthController(UserService<User> userService, JwtTokenUtil tokenUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.tokenUtil = tokenUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody JwtRequest jwtRequest) throws Exception {
        final UserDetails userDetails = this.userService.loadUserByUsername(jwtRequest.getUsername());
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid credential provided");
        }
        authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());

        User user = this.userService.findUserByEmail(jwtRequest.getUsername()).get();
        final String token = this.tokenUtil.generateToken(user);
        user.setToken(token);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/validtoken")
    public ResponseEntity<?> checkTokenExpiry(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        Map<String, Boolean> isExpired = new HashMap<>();
        if(bearerToken != null) {
            String token = bearerToken.substring(7);
            Boolean tokenExpiry = this.tokenUtil.isTokenExpired(token);
            isExpired.put("tokenExpired", tokenExpiry);
            return ResponseEntity.ok().body(isExpired);
        }
        isExpired.put("tokenExpired", true);
        return ResponseEntity.ok().body(isExpired);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("User disabled", e);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("INVALID CREDENTIALS", e);
        }
    }

}
