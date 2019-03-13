package com.dmsproject.dms;

import java.sql.Connection;
import java.sql.DriverManager;

import org.springframework.stereotype.Component;

@Component
public class Database {
	public Connection connection = getConnection();
	
	private Connection getConnection() {
		try  {
			 return DriverManager.getConnection(Constants.DB_URL, Constants.DB_USER, Constants.DB_PASSWORD);
		} catch (java.sql.SQLException e) {
			System.out.println("Error on trying to connect!");
			System.out.println(e);
			return null;
		}
	}
}
