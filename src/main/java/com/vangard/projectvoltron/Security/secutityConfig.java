package com.vangard.projectvoltron.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class secutityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)throws Exception{
        return httpSecurity
            .formLogin(httpForm ->{
                httpForm
                    .loginPage("/login").permitAll();
                
            })

            .authorizeHttpRequests(registry ->{
                registry.requestMatchers("/req/signup" , "/css/**" , "/js/**").permitAll();
                registry.anyRequest().authenticated();
            })

            .build();

    }
    
}
