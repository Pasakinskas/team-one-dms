package com.dmsproject.dms.dto;

public class Recipient {
    private int id;
    private String name;

    public Recipient(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Recipient() {}

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Recipient{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
