package com.dmsproject.dms.controllers;

import org.springframework.http.HttpHeaders;
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
import com.dmsproject.dms.dto.LoginData;
import com.dmsproject.dms.dto.User;

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
public class Login {

    @RequestMapping(
		value = "/login",
		method = RequestMethod.POST,
		produces = "application/json",
		consumes = "application/json"
	)

    @ResponseBody
	public ResponseEntity<?> authorizeUser(@RequestBody @Validated LoginData loginData, Errors errors) {
    	if (errors.hasErrors()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		try {
			User user = UserDAO.fetchUserByLoginData(loginData);
			HttpHeaders httpHeaders = new HttpHeaders();
			if (user == null) {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(user, httpHeaders, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Error");
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
