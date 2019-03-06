package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.UserDAO;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
public class UserController {

    @Autowired
    UserDAO userDAO;

    /**
     * I need to return an error: email already registered
     */
    @RequestMapping(
            value = "/users",
            method = RequestMethod.POST,
            produces = "Application/json",
            consumes = "Application/json"
    )
    public ResponseEntity<?> saveUser(@RequestBody @Validated User user, Errors errors) {
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

    @Secured("ROLE_ADMIN")
    @RequestMapping(
            value = "/users",
            method = RequestMethod.GET,
            produces = "Application/json"
    )
    public ArrayList<User> getAllUsers() {
        return userDAO.getAllUsers(false);
    }

    /**
     * TODO: Handle string input. Return error
     * TODO: if user is null by id I must return an error
     * @param id
     * @return
     */

    @Secured("ROLE_ADMIN")
    @RequestMapping(
            value = "/users/{id}",
            method = RequestMethod.GET,
            produces = "Application/json"
    )
    public User getUser(@PathVariable("id") int id) {
        return userDAO.getUserById(id, false);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(
            value = "/users/{id}",
            method = RequestMethod.DELETE
    )
    public ResponseEntity<?> deleteUser(@PathVariable("id") int id) {
        boolean deleteSuccessful = userDAO.deleteUser(id);
        if (deleteSuccessful) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
