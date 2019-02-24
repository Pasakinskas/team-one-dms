package com.dmsproject.dms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.UserDAO;
import com.dmsproject.dms.dto.User;


@CrossOrigin(origins = Constants.REACT_URL)
@RestController
public class TestingController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(
            value = "/testing",
            method = RequestMethod.GET
    )
    public String pleasePostHere() {
        String firstDraft = passwordEncoder.encode("this is a test");
        String secondDraft = passwordEncoder.encode("this is a test");
        System.out.println(firstDraft);
        System.out.println(secondDraft);
        System.out.println(passwordEncoder.matches("this is a test", firstDraft));
        System.out.println(passwordEncoder.matches("this is a test", secondDraft));
        System.out.println(firstDraft.equals(secondDraft));
        return "check the console";
    }

}
