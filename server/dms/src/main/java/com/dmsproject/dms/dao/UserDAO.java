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

	private User getUserByField(String field, String value) {
		String statementString = "SELECT * FROM users WHERE " +
				field + " = ?";

		try {
			PreparedStatement statement = Database.connection.prepareStatement(statementString);
			statement.setString(1, value);
			ResultSet rs = statement.executeQuery();
			if (rs.next()) {
				User user = new User(
						rs.getInt("user_id"),
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

	public User getUserByEmail(String email) {
		return getUserByField("email", email);
	}

	public User getUserById(int id) {
		return getUserByField("user_id", Integer.toString(id));
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
