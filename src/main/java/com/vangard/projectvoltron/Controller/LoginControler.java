package com.vangard.projectvoltron.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vangard.projectvoltron.Model.MyAppUserService;

@RestController
public class LoginControler {

    @Autowired
    private MyAppUserService myAppUserService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public String loguser(@RequestParam String username,
                          @RequestParam String password,
                          Model model) {
                            
            System.out.println(username);

        try {
            UserDetails userDetails = myAppUserService.loadUserByUsername(username);

            if (passwordEncoder.matches(password, userDetails.getPassword())) {
                return "/index.html";
            } else {
                model.addAttribute("error", "Invalid password");
            }
        } catch (UsernameNotFoundException e) {
            model.addAttribute("error", "User not found");
        }

       
    return "login"; // Fallback or error response
    
    }
}
