package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.RoleDAO;
import com.dmsproject.dms.dao.UserDAO;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
public class UserController {

    @Autowired
    UserDAO userDAO;

    @Autowired
    RoleDAO roleDAO;

    // todo: add ROLE_USER to newly created user

    @RequestMapping(
            value = "/users",
            method = RequestMethod.POST,
            produces = "Application/json",
            consumes = "Application/json"
    )
    public ResponseEntity<?> saveUser(@RequestBody @Validated User user, Errors errors) {
        Map<String, String> resMsg = new HashMap<>();
        if (errors.hasErrors()) {
            resMsg.put("message", "Error" + errors.getAllErrors());
            return new ResponseEntity<>(resMsg, HttpStatus.BAD_REQUEST);
        }
        try {
            int insertedUserId = userDAO.insertUser(user);
            if (insertedUserId > -1) {
                resMsg.put("message", "user saved to db successfully");
                roleDAO.addRoleToUser(insertedUserId, 3);
                return new ResponseEntity<>(resMsg, HttpStatus.CREATED);
            } else {
                resMsg.put("message", "Error saving user to db, iserted user id is " + insertedUserId);
                return new ResponseEntity<>(resMsg, HttpStatus.BAD_REQUEST);
            }
        } catch (SQLException e) {
            resMsg.put("message", e.toString());
            return new ResponseEntity<>(resMsg, HttpStatus.BAD_REQUEST);
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

    @Secured("ROLE_ADMIN")
    @RequestMapping(
            value = "/users/{id}",
            method = RequestMethod.GET,
            produces = "Application/json"
    )
    public ResponseEntity<?> getUser(@PathVariable("id") int id) {
        User user = userDAO.getUserById(id, false);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        Map<String, String> resMsg = new HashMap<>();
        resMsg.put("message", "No such user");
        return new ResponseEntity<>(resMsg ,HttpStatus.BAD_REQUEST);
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
            Map<String, String> resMsg = new HashMap<>();
            resMsg.put("message", "No such user");
            return new ResponseEntity<>(resMsg, HttpStatus.BAD_REQUEST);
        }
    }
}
