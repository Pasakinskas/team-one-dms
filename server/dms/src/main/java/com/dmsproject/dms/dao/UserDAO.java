package com.dmsproject.dms.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;


import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDAO {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Database database;

    public User getUserByEmail(String email, boolean includePassword) {
        return getUserByField("email", email, includePassword);
    }

    public User getUserById(int id, boolean includePassword) {
        return getUserByField("id", Integer.toString(id), includePassword);
    }

    private User getUserByField(String field, String value, boolean includePassword) {
        String statementString = "SELECT * FROM users WHERE " +
                field + " = ? && deleted = 0";

        try {
            PreparedStatement statement = database.connection.prepareStatement(statementString);
            statement.setString(1, value);
            ResultSet rs = statement.executeQuery();

            if (rs.next()) {
                User user = builtUserFromRs(includePassword, rs);
                statement.close();
                return user;
            }
            System.out.println("returning a null user object");
            return null;
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error!");
            System.out.println(e);
            return null;
        }
    }

    private User builtUserFromRs(boolean revealPassword, ResultSet rs) {
        String passwordField;
        try {
            if (revealPassword) {
                passwordField = rs.getString("password");
            } else {
                passwordField = null;
            }
            User user = new User(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("surname"),
                    rs.getString("email"),
                    rs.getString("position"),
                    passwordField
            );
            return user;
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error!");
            System.out.println(e);
            return null;
        }
    }

    public ArrayList<User> getAllUsers(boolean revealPassword) {
        String statementString = "SELECT * FROM users WHERE deleted = 0";
        ArrayList<User> users = new ArrayList<>();
        try {
            PreparedStatement statement = database.connection.prepareStatement(statementString);
            ResultSet rs = statement.executeQuery();
            String passwordField;

            while (rs.next()) {
                User user = builtUserFromRs(revealPassword, rs);
                users.add(user);
            }
            statement.close();
            return users;
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
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL);
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

    public boolean deleteUser(int id) {
        String INSERT_SQL = "UPDATE users SET deleted = 1" +
                " WHERE id = (?)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL);
            statement.setInt(1, id);
            statement.executeUpdate();
            statement.close();
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on delete user!");
            System.out.println(e);
            return false;
        }
        return true;

    }
}
