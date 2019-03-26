package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.GroupDAO;
import com.dmsproject.dms.dto.GroupDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
public class GroupController {

    @Autowired
    private GroupDAO groupDAO;

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/groups", method = RequestMethod.GET)
    public ArrayList<GroupDTO> getAllGroups() {
        return groupDAO.getAllGroups();
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/groups", method = RequestMethod.POST)
    public ResponseEntity<?> createNewGroup(@RequestBody GroupDTO groupDTO) {
        boolean groupCreated = groupDAO.createGroup(groupDTO);
        if (groupCreated) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/groups/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteGroup(@PathVariable("id") String id) {
        boolean isDeletedSuccessfully = groupDAO.deleteGroup(id);
        if (isDeletedSuccessfully) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/groups/users", method = RequestMethod.PATCH)
    public ResponseEntity<?> modGroupUserList(@RequestBody JsonNode json, Errors errors) {
        if (errors.hasErrors()) {
            System.out.println();
        }
        try {
            boolean isActionSuccessful = groupDAO.changeGroupMembers(
                    json.get("action").toString(),
                    json.get("groupid").asInt(),
                    json.get("userid").asInt()
            );
            if (isActionSuccessful) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (IllegalArgumentException | NullPointerException e) {
            System.out.println("error parsing json");
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
