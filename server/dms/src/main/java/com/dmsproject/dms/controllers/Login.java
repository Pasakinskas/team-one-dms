package com.dmsproject.dms.controllers;

import java.util.List;

import javax.validation.Valid;

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

@RestController
@CrossOrigin(origins = Constants.REACT_URL)
public class Login {
	@CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(
		value = "/login",
		method = RequestMethod.POST,
		produces = "application/json",
		consumes = "application/json"
	)

	/**
	 * List solution bad. Must throw exception
	 */
    @ResponseBody
	public String authorizeUser(@RequestBody @Valid LoginData loginData) {

		try {
			List<User> users = UserDAO.fetchUserByLoginData(loginData);
			return "yep, I got the post request: " + users.get(0);
		} catch (Exception e){
			System.out.println("Error");
			System.out.println(e);
		}
		return "error";
	}
}
