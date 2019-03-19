package com.dmsproject.dms.controllers;

import com.dmsproject.dms.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dmsproject.dms.Constants;

@CrossOrigin(origins = Constants.REACT_URL)

//@Secured("ROLE_SUPERADMIN")
@RestController
public class TestingController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @RequestMapping(
            value = "/testing",
            method = RequestMethod.GET
    )
    public Object pleasePostHere() throws AccessDeniedException {

        // return this from string if you want to see the entire content
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // This is the username
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return SecurityContextHolder.getContext().getAuthentication();
    }

}
