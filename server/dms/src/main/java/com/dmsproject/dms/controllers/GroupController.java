package com.dmsproject.dms.controllers;

import com.dmsproject.dms.dao.GroupDAO;
import com.dmsproject.dms.dto.GroupDTO;
import com.dmsproject.dms.dto.GroupMod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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
    @RequestMapping(value = "/groups", method = RequestMethod.PATCH)
    public ResponseEntity<?> modGroupUserList(@RequestBody @Validated GroupMod groupMod, Errors errors) {
        if (errors.hasErrors()) {
            System.out.println();
        }
        boolean isActionSuccessful = groupDAO.modifyGroup(groupMod.isAdd(), groupMod.getGroupid(), groupMod.getUserid());
        if (isActionSuccessful) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
