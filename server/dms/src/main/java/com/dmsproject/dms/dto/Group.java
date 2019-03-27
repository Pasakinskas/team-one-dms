package com.dmsproject.dms.dto;

import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

public class Group {
    @GeneratedValue
    private int id;

    @NotNull
    @NotEmpty
    private String name;

    private int canReceiveDocs;

    private ArrayList<User> membersList;

    public Group(int id, @NotNull @NotEmpty String name, ArrayList<User> membersList, int canReceiveDocuments) {
        this.id = id;
        this.name = name;
        this.canReceiveDocs = canReceiveDocuments;
        this.membersList = membersList;
    }

    public Group(int id, @NotNull @NotEmpty String name) {
        this.id = id;
        this.name = name;
    }

    public Group() {
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

    public int getCanReceiveDocs() {
        return canReceiveDocs;
    }

    public void setCanReceiveDocs(int canReceiveDocs) {
        this.canReceiveDocs = canReceiveDocs;
    }

    public ArrayList<User> getMembersList() {
        return membersList;
    }

    public void setMembersList(ArrayList<User> membersList) {
        this.membersList = membersList;
    }
}
