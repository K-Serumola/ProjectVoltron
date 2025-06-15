package com.vangard.projectvoltron.Controller;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.vangard.projectvoltron.Model.MyAppUser;
import com.vangard.projectvoltron.Model.MyAppUserRepository;

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

    @Autowired
    private MyAppUserRepository myAppUserRepository;

    @GetMapping("/profile")
    public String profilepage(Model model, Principal principal){
    if (principal == null) {
        return "redirect:/login";
    }

    String username = principal.getName();
    Optional<MyAppUser> userOptional = myAppUserRepository.findByUsername(username);

    if (userOptional.isPresent()) {
        MyAppUser user = userOptional.get();
        model.addAttribute("user", user);
        return "profile";
    } else {
        return "redirect:/login";
    }
    }

    @GetMapping("/Apptutorial")
    public String apptutorialpage(){
        return "Apptutorial";
    }

    @GetMapping("/save-to-win")
    public String savetowin(){
        return "save-to-win";
    }
}
