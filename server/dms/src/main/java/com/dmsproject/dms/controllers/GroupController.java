package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.GroupDAO;
import com.dmsproject.dms.dto.Group;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
public class GroupController {

    @Autowired
    private GroupDAO groupDAO;

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/groups", method = RequestMethod.GET)
    public ArrayList<Group> getAllGroups() {
        return groupDAO.getAllGroups();
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/groups", method = RequestMethod.POST)
    public ResponseEntity<?> createNewGroup(@RequestBody Group group) {
        boolean groupCreated = groupDAO.createGroup(group);
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
    @RequestMapping(value = "/groups/status", method = RequestMethod.PATCH)
    public ResponseEntity<?> changeGroupRights(@RequestBody JsonNode json, Errors errors) {
        if (errors.hasErrors()) {
            System.out.println();
        }
        try {
            int groupid = json.get("groupid").asInt();
            int status = json.get("canReceiveDocs").asInt();

            groupDAO.toggleRights(groupid, status);
            Map<String, String> resMsg = new HashMap<>();
            resMsg.put("message", "Status changed for group " + groupid + " successfully");
            return new ResponseEntity<>(resMsg, HttpStatus.OK);
        } catch (SQLException e) {
            Map<String, String> resMsg = new HashMap<>();
            resMsg.put("message",e.getLocalizedMessage());
            return new ResponseEntity<>(resMsg, HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/groups/users", method = RequestMethod.PATCH)
    public ResponseEntity<?> modGroupUserList(@RequestBody JsonNode json, Errors errors) {
        System.out.println(json);
        if (errors.hasErrors()) {
            System.out.println();
        }
        try {
            boolean isActionSuccessful = groupDAO.changeGroupMembers(
                    json.get("action").asText(),
                    json.get("groupid").asInt(),
                    json.get("userid").asInt()
            );
            if (isActionSuccessful) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (IllegalArgumentException | NullPointerException e) {
            System.out.println("error, bad json, bad action or user in group");
            Map<String, String> resMsg = new HashMap<>();
            resMsg.put("message",e.getLocalizedMessage());
            return new ResponseEntity<>(resMsg, HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_USER")
    @RequestMapping(
            value = "/groups/mygroups",
            method = RequestMethod.GET
    )
    public ResponseEntity<?> getUserGroups() throws SQLException {
        int currentUserId = Integer.parseInt(
                (String) SecurityContextHolder.getContext().getAuthentication().getCredentials()
        );
        ArrayList<Group> myGroups = groupDAO.getUserGroups(currentUserId);

        return new ResponseEntity<>(myGroups, HttpStatus.OK);
    }
}
