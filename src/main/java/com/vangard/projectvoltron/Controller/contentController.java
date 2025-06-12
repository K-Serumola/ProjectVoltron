package com.vangard.projectvoltron.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.vangard.projectvoltron.Model.MyAppUser;

@Controller
public class contentController {

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/req/signup")
    public String signup(Model model) {
        model.addAttribute("user", new MyAppUser()); // Important!
        return "signup";
    }
    
    @GetMapping("/index")
    public String home(){
        return "index";
    }
}
