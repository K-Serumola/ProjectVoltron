package com.vangard.projectvoltron.Model;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MyAppUserService implements UserDetailsService {

    private final MyAppUserRepository myAppUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return myAppUserRepository.findByUsername(username)
            .map(userObj -> User.builder()
                .username(userObj.getUsername())
                .password(userObj.getPassword()) 
                .roles("USER") 
                .build())
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
