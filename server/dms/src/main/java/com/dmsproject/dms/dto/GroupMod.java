package com.dmsproject.dms.dto;

public class GroupMod {
    private boolean add;
    private int userid;
    private int groupid;

    public boolean isAdd() {
        return add;
    }

    public void setAdd(boolean add) {
        this.add = add;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getGroupid() {
        return groupid;
    }

    public void setGroupid(int groupid) {
        this.groupid = groupid;
    }

    @Override
    public String toString() {
        return "GroupMod{" +
                "add=" + add +
                ", userid=" + userid +
                ", groupid=" + groupid +
                '}';
    }
}
