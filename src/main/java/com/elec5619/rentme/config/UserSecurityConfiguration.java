package com.elec5619.rentme.config;


import com.elec5619.rentme.entities.User;
import com.elec5619.rentme.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class UserSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final PasswordEncrypt passwordEncrypt;
    private final UserService userService;
    private final JwtRequestFilter requestFilter;
    private final JwtAuthenticationEntryPoint entryPoint;

    public UserSecurityConfiguration(PasswordEncrypt passwordEncrypt, UserService<User> userService, JwtRequestFilter requestFilter,
                                     JwtAuthenticationEntryPoint entryPoint) {
        this.passwordEncrypt = passwordEncrypt;
        this.userService = userService;
        this.requestFilter = requestFilter;
        this.entryPoint = entryPoint;
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncrypt.passwordEncoder());
    }

    private BCryptPasswordEncoder passwordEncoder() {
        return this.passwordEncrypt.passwordEncoder();
    }

    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        //Configure AuthenticationManager so that it knows from where to load
        //User matching credentials
        //User BCryptPasswordEncoder

        auth.userDetailsService(this.userService).passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/auth/**")
                .permitAll()
                .antMatchers("/api/user/**")
                .permitAll()
                .antMatchers("/public/**")
                .permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(this.entryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(this.requestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
