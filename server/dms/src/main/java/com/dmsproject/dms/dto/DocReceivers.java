package com.dmsproject.dms.dto;

public class DocReceivers {
    private Integer id;
    private Integer docId;
    private Integer recUserId;
    private Integer recGroupId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDocId() {
        return docId;
    }

    public void setDocId(Integer docId) {
        this.docId = docId;
    }

    public Integer getRecUserId() {
        return recUserId;
    }

    public void setRecUserId(Integer recUserId) {
        this.recUserId = recUserId;
    }

    public Integer getRecGroupId() {
        return recGroupId;
    }

    public void setRecGroupId(Integer recGroupId) {
        this.recGroupId = recGroupId;
    }
}
