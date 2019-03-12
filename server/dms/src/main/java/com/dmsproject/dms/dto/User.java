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
	
	@NotNull
	private String position;
	
	@NotNull
	private String password;
	
	public User(int id, String name, String surname, String email,
			String position, String password) {
		this.setName(name);
		this.setSurname(surname);
		this.setEmail(email);
		this.setPosition(position);
		this.setPassword(password);
		this.setId(id);
	}

	public User() {

	}

	public void setPosition(String position) {
		this.position = position;
	}

	public void setPassword(String password) {
		this.password = password;
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
	
	public String getPassword() {
		return password;
	}
	
	public String getPosition() {
		return position;
	}

	public String toString() {
		return "{ name: "+ getName() +
				" surname: " + getSurname() +
				" email: " + getEmail() +
				" position: " + getPosition() +
				" pass: " + getPassword() + " }";
	}
}
