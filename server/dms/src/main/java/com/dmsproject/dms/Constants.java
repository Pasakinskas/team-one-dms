package com.dmsproject.dms;


import java.sql.Connection;
import java.sql.DriverManager;

public class Constants {
	//Mariaus DB
//	public static final String DB_NAME = "first_db";
//	public static final String DB_URL = "jdbc:mysql://localhost:3306/" + DB_NAME;
//	public static final String DB_USER = "root";
//	public static final String DB_PASSWORD = "";

	//Inos DB
	public static final String DB_NAME = "DVS";
	public static final String DB_URL = "jdbc:mysql://localhost:3306/" + DB_NAME;
	public static final String DB_USER = "ina";
	public static final String DB_PASSWORD = "ina123456789";
	public static final Connection connection = getConnection();
	
	private static Connection getConnection() {
		try  {
			 return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
		} catch (java.sql.SQLException e) {
			System.out.println("Error!");
			System.out.println(e);
			return null;
		}
	}
}

	
