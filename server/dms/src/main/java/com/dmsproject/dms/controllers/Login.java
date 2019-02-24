package com.dmsproject.dms.controllers;

import com.dmsproject.dms.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
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

@CrossOrigin(origins = Constants.REACT_URL, exposedHeaders = "token")
@RestController
public class Login {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @CrossOrigin("http://localhost:3000/")
    @RequestMapping(
            value = "/login",
            method = RequestMethod.POST,
            produces = "application/json",
            consumes = "application/json"
    )

    @ResponseBody
    public ResponseEntity<?> authorizeUser(@RequestBody @Validated LoginData loginData, Errors errors)
            throws AuthenticationException {

        if (errors.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            User user = UserDAO.getUserByEmail(loginData.getEmail());
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            final String token = jwtTokenUtil.generateToken();
            System.out.println(token);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("token", token);

            return new ResponseEntity<>(user, httpHeaders, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error on login route");
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin(origins = Constants.REACT_URL)
    @RequestMapping(
            value = "/login",
            method = RequestMethod.GET
    )
    public String pleasePostHere() {
        return "this is a test and my secret info is cowpoke";
    }

}
