package com.vangard.projectvoltron.Controller;

import java.util.Optional;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.vangard.projectvoltron.Model.MyAppUser;
import com.vangard.projectvoltron.Model.MyAppUserRepository;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class DNAProfileController {

    private final MyAppUserRepository userRepository;

    @PostMapping("/submit-dna-profile")
    public String saveDNAProfile(@AuthenticationPrincipal UserDetails userDetails,
                                 @RequestParam String lifestyle,
                                 @RequestParam String goals,
                                 @RequestParam String spending,
                                 @RequestParam String techLevel,
                                 @RequestParam String commPref,
                                 @RequestParam String accessibility,
                                 @RequestParam String disabilities) {

        Optional<MyAppUser> optionalUser = userRepository.findByUsername(userDetails.getUsername());

        if (optionalUser.isPresent()) {
            MyAppUser user = optionalUser.get();
    
            user.setLifestyle(lifestyle);
            user.setGoals(goals);
            user.setSpending(spending);
            user.setTechLevel(techLevel);
            user.setCommPref(commPref);
            user.setAccessibility(accessibility);
            user.setDisabilities(disabilities);

            userRepository.save(user);
        }


        return "/index"; 
    }
}
