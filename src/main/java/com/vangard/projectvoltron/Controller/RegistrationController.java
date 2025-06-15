package com.vangard.projectvoltron.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.vangard.projectvoltron.Model.MyAppUser;
import com.vangard.projectvoltron.Model.MyAppUserRepository;

@Controller
public class RegistrationController {

    @Autowired
    private MyAppUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/req/signup")
    public String registerUser(@ModelAttribute MyAppUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "redirect:/login"; // or wherever you want to go next
    }
}
