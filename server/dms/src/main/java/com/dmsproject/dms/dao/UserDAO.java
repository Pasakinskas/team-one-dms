package com.dmsproject.dms.dao;

import java.sql.PreparedStatement;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dto.User;

public class UserDAO {

	private static final String INSERT_SQL = "INSERT INTO users" +
            "(name, surname, email) " +
            "values (?, ?, ?)";
		
	public static boolean addUser(final User user) {
		try {
		    PreparedStatement statement = Constants.connection.prepareStatement(INSERT_SQL);
		    statement.setString(1, user.getName());
		    statement.setString(2, user.getSurname());
		    statement.setString(3, user.getEmail());
		
		    statement.executeUpdate();
		    statement.close();
		} catch (java.sql.SQLException e) {
			System.out.println("Error adding to database");
		    System.out.println(e);
		    return false;
		}
		return true;
	}
}
