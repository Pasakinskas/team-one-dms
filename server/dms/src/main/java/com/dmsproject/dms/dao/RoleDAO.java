package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

@Component
public class RoleDAO {
    @Autowired
    private Database database;

    public ArrayList<Role> getAllRoles() {
        String statementString = "SELECT * FROM roles WHERE roles.deleted = 0";

        ArrayList<Role> roles = new ArrayList<>();

        try {
            PreparedStatement statement = database.connection.prepareStatement(statementString);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                int roleId = rs.getInt("id");
                Role role = new Role(roleId, rs.getString("name"));
                roles.add(role);
            }
            statement.close();
            return roles;
        } catch (java.sql.SQLException e) {
            System.err.println("SQL error getting all groups!");
            System.out.println(e);
            return null;
        }
    }

    public boolean deleteRole(String id) {
        String INSERT_SQL = "UPDATE roles SET deleted = 1" +
                " WHERE id = (? && id != 1)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL);
            statement.setString(1, id);
            statement.executeUpdate();
            statement.close();
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on delete role! Reminder: admin role cannot be deleted");
            System.out.println(e);
            return false;
        }
        return true;
    }

    public boolean createRole(Role role) {
        String INSERT_SQL = "INSERT INTO roles (name) values (?)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL);
            statement.setString(1, role.getName());

            statement.executeUpdate();
            statement.close();
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on role create!");
            System.out.println(e);
            return false;
        }
        return true;
    }

    public ArrayList<String> getRolesByUserId(int id) {
        ArrayList<String> roles = new ArrayList<>();
        String query = "SELECT roles.name FROM roles " +
                "INNER JOIN user_roles " +
                "ON user_roles.role_id = roles.id " +
                "WHERE user_roles.user_id = (?)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                roles.add(rs.getString("name"));
            }
            statement.close();
            return roles;

        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on getting all roles by user id!");
            System.out.println(e);
            return roles;
        }
    }

    public boolean addRoleToUser(int userid, int roleid) {
        return manageRoles(true, userid, roleid);
    }

    public boolean revokeRole(int userid, int roleid) {
        return manageRoles(false, userid, roleid);
    }

    private boolean manageRoles(boolean isActionAdd, int userid, int roleid) {
        String insertStatement = "INSERT INTO roles (role_id, user_id) VALUES (?, ?)";
        String deleteStatement = "DELETE FROM roles WHERE role_id = (?) && user_id = (?)";
        try {
            PreparedStatement statement;
            if (isActionAdd) {
                statement = database.connection.prepareStatement(insertStatement);
            } else {
                statement = database.connection.prepareStatement(deleteStatement);
            }

            statement.setInt(1, roleid);
            statement.setInt(2, userid);
            statement.executeUpdate();
            return true;
        } catch (java.sql.SQLException e) {
            System.err.println("SQL error getting all groups!");
            System.out.println(e);
            return false;
        }
    }
}
