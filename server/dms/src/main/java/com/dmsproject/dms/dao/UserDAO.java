package com.dmsproject.dms.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.LoginData;
import com.dmsproject.dms.dto.User;

public class UserDAO {
	/**
	 *  Returning a list of 1 or 0 objects is hacky.
	 *  Sure it works as a prototype, but must throw an
	 *  Exception Eventually.
	 */
	public static List<User> fetchUserByLoginData(LoginData loginData) {
		String statementString = "SELECT * FROM users WHERE " +
				"email" + " = ? && password = ?";

		List<User> users = new ArrayList<User>();

		try {
		    PreparedStatement statement = Database.connection.prepareStatement(statementString);
		    statement.setString(1, loginData.getEmail());
			statement.setString(2, loginData.getPassword());
		    System.out.println(statement.toString());
		    ResultSet rs = statement.executeQuery();

		    while (rs.next()) {
		    	User user = new User(
	    			rs.getString("name"),
	    			rs.getString("surname"),
	    			rs.getString("email"),
	    			rs.getString("position"),
	    			rs.getString("password")
    			);
		    	users.add(user);
		    }
            statement.close();
		} catch (java.sql.SQLException e) {
			System.out.println("SQL error!");
		    System.out.println(e);
		}
		return users;
	}
		
	public static boolean insertUser(final User user) {
		final String INSERT_SQL = "INSERT INTO users" +
	            "(name, surname, email, 'position', password) " +
	            "values (?, ?, ?, ?, ?)";
		
		try {
		    PreparedStatement statement = Database.connection.prepareStatement(INSERT_SQL);
		    statement.setString(1, user.getName());
		    statement.setString(2, user.getSurname());
		    statement.setString(3, user.getEmail());
		    statement.setString(4, user.getPosition());
		    statement.setString(5, user.getPassword());
		
		    statement.executeUpdate();
		    statement.close();
		} catch (java.sql.SQLException e) {
			System.out.println("SQL error!");
		    System.out.println(e);
		    return false;
		}
		return true;
	}
}
