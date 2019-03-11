package com.dmsproject.dms.controllers;

import com.dmsproject.dms.dao.GroupDAO;
import com.dmsproject.dms.dto.GroupDTO;
import com.dmsproject.dms.dto.GroupMod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
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
    public void createNewGroup(@RequestBody GroupDTO groupDTO) {
        boolean added = groupDAO.createGroup(groupDTO);
        if (added) {
            System.out.println("added successfully");
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/groups/{id}", method = RequestMethod.DELETE)
    public void deleteGroup(@PathVariable("id") String id) {
        boolean added = groupDAO.deleteGroup(id);
        if (added) {
            System.out.println("group was deleted");
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/groups", method = RequestMethod.PATCH)
    public String modGroupUserList(@RequestBody GroupMod groupMod) {
        boolean answer = groupDAO.addMemberToGroup(groupMod.getGroupid(), groupMod.getUserid());
        if (answer) {
            return "yes";
        } else {
            return "no";
        }
    }
}
