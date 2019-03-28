package com.dmsproject.dms.dto;

public class Document {
    private int id;
    private String number;
    private int typeId;
    private String name;
    private String content;

    public Document(String number, int typeId, String name, String content) {
        this.number = number;
        this.typeId = typeId;
        this.name = name;
        this.content = content;
    }

    public Document() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
