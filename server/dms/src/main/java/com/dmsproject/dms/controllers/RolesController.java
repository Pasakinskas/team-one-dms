package com.dmsproject.dms.controllers;

import com.dmsproject.dms.dao.RoleDAO;
import com.dmsproject.dms.dto.Role;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class RolesController {

    @Autowired
    private RoleDAO roleDAO;

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/roles", method = RequestMethod.GET)
    public ArrayList<Role> getAllRoles() {
        return roleDAO.getAllRoles();
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/roles", method = RequestMethod.POST)
    public ResponseEntity<?> createNewRole(@RequestBody Role role) {
        boolean roleCreatedSuccessFully = roleDAO.createRole(role);
        if (roleCreatedSuccessFully) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/roles/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteGroup(@PathVariable("id") String id) {
        boolean isDeletedSuccessfully = roleDAO.deleteRole(id);
        if (isDeletedSuccessfully) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/roles/assign", method = RequestMethod.PATCH)
    public ResponseEntity<?> assignRoleToUser(@RequestBody JsonNode json, Errors errors) {
        if (errors.hasErrors()) {
            System.out.println(errors.hasErrors());
        }
        try {
            int userid = json.get("userid").asInt();
            int roleid = json.get("groupid").asInt();
            boolean isActionSuccessful = roleDAO.addRoleToUser(userid, roleid);
            if (isActionSuccessful) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (NullPointerException e) {
            System.out.println(e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/roles/revoke", method = RequestMethod.PATCH)
    public ResponseEntity<?> revokeRoleForUser(@RequestBody @Validated JsonNode json, Errors errors) {
        if (errors.hasErrors()) {
            System.out.println(errors.hasErrors());
        }
        try {
            int userid = json.get("userid").asInt();
            int roleid = json.get("groupid").asInt();
            boolean isActionSuccessful = roleDAO.revokeRole(userid, roleid);
            if (isActionSuccessful) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (NullPointerException e) {
            System.out.println(e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
