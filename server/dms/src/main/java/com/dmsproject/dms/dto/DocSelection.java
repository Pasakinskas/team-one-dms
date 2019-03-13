package com.dmsproject.dms.dto;

public class DocSelection {
    private String number;
    private String ownerName;
    private String ownerSurname;
    private String docName;
    private String status;
    private String details;
    private String date;
    private String receivGroupName;
    private Integer receivGroupId;
    private String receiverPosition;
    private String receiverName;
    private String receiverSurname;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getOwnerSurname() {
        return ownerSurname;
    }

    public void setOwnerSurname(String ownerSurname) {
        this.ownerSurname = ownerSurname;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getReceivGroupName() {
        return receivGroupName;
    }

    public void setReceivGroupName(String receivGroupName) {
        this.receivGroupName = receivGroupName;
    }

    public Integer getReceivGroupId() {
        return receivGroupId;
    }

    public void setReceivGroupId(Integer receivGroupId) {
        this.receivGroupId = receivGroupId;
    }

    public String getReceiverPosition() {
        return receiverPosition;
    }

    public void setReceiverPosition(String receiverPosition) {
        this.receiverPosition = receiverPosition;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getReceiverSurname() {
        return receiverSurname;
    }

    public void setReceiverSurname(String receiverSurname) {
        this.receiverSurname = receiverSurname;
    }
}
