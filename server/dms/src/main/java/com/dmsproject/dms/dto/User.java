package com.dmsproject.dms.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class User {
	@Id
	@GeneratedValue
	private int id;
	
	@NotNull
	private String name;
	
	@NotNull
	private String surname;
	
	@NotNull
	private String email;
	
	public User(String name, String surname, String email) {
		this.setName(name);
		this.setSurname(surname);
		this.setEmail(email);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
