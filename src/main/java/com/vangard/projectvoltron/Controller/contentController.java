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

    @GetMapping("/quiz")
    public String quiz(){
        return "quiz";
    }

    @GetMapping("/learn")
    public String learnpage(){
        return "learn";
    }

    @GetMapping("/mindbank")
    public String mindbankPage(){
        return "mindbank";
    }

    @GetMapping("/nubi")
    public String nubi(){
        return "nubi";
    }

    @GetMapping("/profile")
    public String profilepage(){
        return "profile";
    }

    
}
