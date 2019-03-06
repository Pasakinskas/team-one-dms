package com.dmsproject.dms;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.springframework.stereotype.Component;

@Component
public class Database {
	public Connection connection = getConnection();
	
	private static Connection getConnection() {
		try  {
			 return DriverManager.getConnection(Constants.DB_URL, Constants.DB_USER, Constants.DB_PASSWORD);
		} catch (java.sql.SQLException e) {
			System.out.println("Error!");
			System.out.println(e);
			return null;
		}
	}
	
	public int fetchId(String table, String field, String value) {
		String statementString = "SELECT position_id FROM " + table +  " WHERE " + field + " = ?";
		int id = -1;

		try {
		    PreparedStatement statement = connection.prepareStatement(statementString);
		    statement.setString(1, value);
		    ResultSet rs = statement.executeQuery();
		    rs.next();
		    id = rs.getInt(1);
            statement.close();
		} catch (java.sql.SQLException e) {
			System.out.println("SQL error!");
		    System.out.println(e);
		}
		return id;
	}
	
	
}
