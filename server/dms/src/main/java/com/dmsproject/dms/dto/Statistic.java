package com.dmsproject.dms.dto;

public class Statistic {
    private int submited;
    private int accepted;
    private int declined;

    public int getSubmited() {
        return submited;
    }

    public void setSubmited(int submited) {
        this.submited = submited;
    }

    public int getAccepted() {
        return accepted;
    }

    public void setAccepted(int accepted) {
        this.accepted = accepted;
    }

    public int getDeclined() {
        return declined;
    }

    public void setDeclined(int declined) {
        this.declined = declined;
    }
}
