package com.vangard.projectvoltron.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vangard.projectvoltron.Model.MyAppUser;
import com.vangard.projectvoltron.Model.MyAppUserRepository;

@RestController
public class RegistrationController {

    @Autowired
    private MyAppUserRepository myAppUserRepository;
    
    @PostMapping(value = "/req/signup", consumes = "application/json")
    public MyAppUser createUser(@RequestBody MyAppUser user){
        return myAppUserRepository.save(user);
    }

}
