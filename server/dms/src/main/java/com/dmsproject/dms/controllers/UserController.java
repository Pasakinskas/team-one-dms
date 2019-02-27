package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.UserDAO;
import com.dmsproject.dms.dto.User;
import com.dmsproject.dms.service.UserService;
import org.hibernate.validator.constraints.pl.REGON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
public class UserController {

    @Autowired
    UserDAO userDAO;

    @Secured("ROLE_ADMIN")
    @RequestMapping(
            value = "/user",
            method = RequestMethod.GET,
            produces = "Application/json"
    )
    public String getAllUsers() {
        return "Getting all users";
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(
            value = "/user/{id}",
            method = RequestMethod.GET,
            produces = "Application/json"
    )
    public User getUser(@PathVariable("id") int id) {
        return userDAO.getUserById(id);
    }

    @RequestMapping(
            value = "/user",
            method = RequestMethod.POST,
            produces = "Application/json"
    )
    public String saveUser(@RequestBody @Validated User user, Errors errors) {
        return "lele";
    }
}
