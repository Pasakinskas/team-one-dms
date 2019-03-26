package com.dmsproject.dms.dto;

public class DocSelection {
    private Integer Id;
    private String number;
    private String owner;
    private String docName;
    private String status;
    private String details;
    private String date;
    //private String receivGroupName;
    //private Integer receivGroupId;
    private String receiver;
    //private Integer receiverId;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
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

//    public String getReceivGroupName() {
//        return receivGroupName;
//    }
//
//    public void setReceivGroupName(String receivGroupName) {
//        this.receivGroupName = receivGroupName;
//    }
//
//    public Integer getReceivGroupId() {
//        return receivGroupId;
//    }
//
//    public void setReceivGroupId(Integer receivGroupId) {
//        this.receivGroupId = receivGroupId;
//    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

//    public Integer getReceiverId() {
//        return receiverId;
//    }
//
//    public void setReceiverId(Integer receiverId) {
//        this.receiverId = receiverId;
//    }
}
