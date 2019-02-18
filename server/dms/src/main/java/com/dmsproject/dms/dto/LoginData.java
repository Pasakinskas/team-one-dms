package com.dmsproject.dms.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class LoginData {
	
	@NotNull
	@NotEmpty
	private String email;
	
	@NotNull
	private String password;
	
	public LoginData(String email, String password) {
		this.email = email;
		this.password = password;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String toString() {
		return "{email: " + getEmail() + ", pass: "+ getPassword() + "}";
	}	
}
