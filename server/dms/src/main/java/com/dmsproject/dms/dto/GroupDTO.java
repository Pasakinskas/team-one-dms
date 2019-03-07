package com.dmsproject.dms.dto;

import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

public class GroupDTO {
    @GeneratedValue
    private int id;

    @NotNull
    @NotEmpty
    private String name;

    @NotNull
    private ArrayList<User> membersList;

    public GroupDTO(int id, @NotNull @NotEmpty String name, ArrayList<User> membersList) {
        this.id = id;
        this.name = name;
        this.membersList = membersList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<User> getMembersList() {
        return membersList;
    }

    public void setMembersList(ArrayList<User> membersList) {
        this.membersList = membersList;
    }
}
