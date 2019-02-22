package com.dmsproject.dms.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;


import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDAO {

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static User getUserByEmail(String email) {
		String statementString = "SELECT * FROM users WHERE " +
				"email" + " = ?";

		try {
		    PreparedStatement statement = Database.connection.prepareStatement(statementString);
		    statement.setString(1, email);
		    ResultSet rs = statement.executeQuery();
		   	if (rs.next()) {
		   		User user = new User(
					rs.getString("name"),
					rs.getString("surname"),
					rs.getString("email"),
					rs.getString("position"),
					rs.getString("password")
				);
				statement.close();
				return user;
			}
		   	return null;
		} catch (java.sql.SQLException e) {
			System.out.println("SQL error!");
		    System.out.println(e);
		    return null;
		}
	}

	public boolean insertUser(final User user) {
		final String INSERT_SQL = "INSERT INTO users " +
	            "(name, surname, email, position, password) " +
	            "values (?, ?, ?, ?, ?)";
		
		try {
		    PreparedStatement statement = Database.connection.prepareStatement(INSERT_SQL);
		    statement.setString(1, user.getName());
		    statement.setString(2, user.getSurname());
		    statement.setString(3, user.getEmail());
		    statement.setString(4, user.getPosition());
		    statement.setString(5, passwordEncoder.encode(user.getPassword()));
		
		    statement.executeUpdate();
		    statement.close();
		} catch (java.sql.SQLException e) {
			System.out.println("SQL error on register!");
		    System.out.println(e);
		    return false;
		}
		return true;
	}
}
