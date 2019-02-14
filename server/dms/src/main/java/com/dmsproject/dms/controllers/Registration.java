package com.dmsproject.dms.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.UserDAO;
import com.dmsproject.dms.dto.User;

import javax.validation.Valid;
import java.util.List;

/**
 *  Don't forget to change the password in Constants.java
 */

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
public class Registration {
	
	@ResponseBody
    @RequestMapping(
		value = "/register",
		method = RequestMethod.POST,
		produces = "Application/json",
		consumes = "Application/json"
	)
	@CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> createUser(@RequestBody @Valid User user) {
		System.out.println(user);
    	boolean isSuccesful = UserDAO.insertUser(user);
    	
    	System.out.println("I have received a post request and the answer was " + isSuccesful);
    	return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    
    @RequestMapping(
		value = "/register",
		method = RequestMethod.GET
	)
    public String pleasePostHere() {
    	return "You just made a get request. Please use post here.";
    }

}
