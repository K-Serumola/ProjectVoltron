package com.vangard.projectvoltron;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeControler {

    @RequestMapping("/")
    public String login(){
        return "login.html";
    }
}
