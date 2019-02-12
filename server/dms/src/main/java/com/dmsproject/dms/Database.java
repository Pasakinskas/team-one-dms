package com.dmsproject.dms;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.dmsproject.dms.Constants;

public class Database {
	public static final Connection connection = getConnection();
	
	private static Connection getConnection() {
		try  {
			 return DriverManager.getConnection(Constants.DB_URL, Constants.DB_USER, Constants.DB_PASSWORD);
		} catch (java.sql.SQLException e) {
			System.out.println("Error!");
			System.out.println(e);
			return null;
		}
	}
	
	public static int fetchId(String table, String field, String value) {
		String statementString = "SELECT position_id FROM " + table +  " WHERE " + field + " = ?";
		try {
		    PreparedStatement statement = Database.connection.prepareStatement(statementString);
		    statement.setString(1, value);
		    ResultSet rs = statement.executeQuery();
		    
		    while (rs.next()) {
			    return rs.getInt(1);
		    }
            statement.close();
		} catch (java.sql.SQLException e) {
			System.out.println("SQL error!");
		    System.out.println(e);
		}
		return -1;
	}
	
	
}
