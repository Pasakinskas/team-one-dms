package com.dmsproject.dms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class Registration {
	@Autowired
	private UserDAO userDAO;

	@ResponseBody
    @RequestMapping(
		value = "/register",
		method = RequestMethod.POST,
		produces = "Application/json",
		consumes = "Application/json"
	)
    public ResponseEntity<?> createUser(@RequestBody @Validated User user, Errors errors) {
		System.out.println("registration has received the req");
		if (errors.hasErrors()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    	boolean userAddSuccessful = userDAO.insertUser(user);
    	if (userAddSuccessful) {
			return new ResponseEntity<>(HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }

    @RequestMapping(
		value = "/register",
		method = RequestMethod.GET
	)
    public String pleasePostHere() {
    	return "You just made a get request. Please use post here.";
    }
}
