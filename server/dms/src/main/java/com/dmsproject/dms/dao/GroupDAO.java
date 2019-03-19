package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.GroupDTO;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

@Component
public class GroupDAO {
    @Autowired
    private Database database;

    public boolean createGroup(GroupDTO group) {
        String INSERT_SQL = "INSERT INTO groups (name) values (?)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL);
            statement.setString(1, group.getName());

            statement.executeUpdate();
            statement.close();
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on register!");
            System.out.println(e);
            return false;
        }
        return true;
    }

    private ArrayList<User> getAllGroupMembers(int groupid) {
        ArrayList<User> users = new ArrayList<>();
        String statementString = "select user_id, users.name, surname, email, position from group_users " +
                "inner join users " +
                "on user_id = users.id " +
                "inner join groups " +
                "on group_id = groups.id " +
                "where group_id = (?) && users.deleted = 0 && groups.deleted = 0";

        try {
            PreparedStatement statement = database.connection.prepareStatement(statementString);
            statement.setInt(1, groupid);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                User user = new User(
                        rs.getInt("user_id"),
                        rs.getString("name"),
                        rs.getString("surname"),
                        rs.getString("email"),
                        rs.getString("position"),
                        null
                );
                users.add(user);
            }
            statement.close();
            return users;
        } catch (java.sql.SQLException e) {
            System.err.println("SQL error getting all groups!");
            System.out.println(e);
            return null;
        }
    }

    public boolean modifyGroup(String addToGroup, int groupid, int userid) {
        String insertStatement = "INSERT INTO group_users (group_id, user_id) VALUES (?, ?)";
        String deleteStatement = "DELETE FROM group_users WHERE group_id = (?) && user_id = (?)";
        try {
            PreparedStatement statement;
            if (addToGroup.equals("add")) {
                statement = database.connection.prepareStatement(insertStatement);
            } else if (addToGroup.equals("remove")) {
                statement = database.connection.prepareStatement(deleteStatement);
            } else {
                throw new IllegalArgumentException("bad action provided in json");
            }

            statement.setInt(1, groupid);
            statement.setInt(2, userid);
            statement.executeUpdate();
            return true;
        } catch (java.sql.SQLException e) {
            System.err.println("SQL error getting all groups!");
            System.out.println(e);
            return false;
        }
    }

    public ArrayList<GroupDTO> getAllGroups() {
        String statementString = "SELECT * FROM groups WHERE groups.deleted = 0";

        ArrayList<GroupDTO> groups = new ArrayList<>();

        try {
            PreparedStatement statement = database.connection.prepareStatement(statementString);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                int groupId = rs.getInt("id");
                GroupDTO group = new GroupDTO(
                        groupId,
                        rs.getString("name"),
                        getAllGroupMembers(groupId)
                );
                groups.add(group);
            }
            statement.close();
        return groups;
        } catch (java.sql.SQLException e) {
            System.err.println("SQL error getting all groups!");
            System.out.println(e);
            return null;
        }
    }

    public boolean deleteGroup(String id) {
        String INSERT_SQL = "UPDATE groups SET deleted = 1" +
                " WHERE id = (?)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL);
            statement.setString(1, id);
            statement.executeUpdate();
            statement.close();
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on delete group!");
            System.out.println(e);
            return false;
        }
        return true;
    }
}
