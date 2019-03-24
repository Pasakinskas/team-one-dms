package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.service.RecipientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = Constants.REACT_URL)
public class RecipientController {

    @Autowired
    RecipientService recipientService;

    @RequestMapping(value = "/recipients", method = RequestMethod.GET)
    public ResponseEntity<?> getAllRecipients() {
        try {
            return new ResponseEntity<>(recipientService.getAllRecipients(), HttpStatus.OK);
        } catch (SQLException e) {
            Map<String, String> resMsg = new HashMap<>();
            resMsg.put("message", e.toString());
            return new ResponseEntity<>(resMsg ,HttpStatus.BAD_REQUEST);
        }
    }
}
