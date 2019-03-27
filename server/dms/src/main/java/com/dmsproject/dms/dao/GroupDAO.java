package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.Group;
import com.dmsproject.dms.dto.Recipient;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@Component
public class GroupDAO {
    @Autowired
    private Database database;

    public boolean createGroup(Group group) {
        String INSERT_SQL = "INSERT INTO groups (group_name) values (?)";
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
        String statementString = "select users.user_id, users.name, surname, email, position from user_groups " +
                "inner join users " +
                "on user_groups.user_id = users.user_id " +
                "inner join groups " +
                "on user_groups.group_id = groups.group_id " +
                "where user_groups.group_id = (?) && users.deleted = 0 && groups.deleted = 0";

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

    private boolean isUserInGroup(int userid, int groupid) {
        String countStatement = "select count(*) from user_groups where user_id = (?) && group_id = (?)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(countStatement);
            statement.setInt(1, userid);
            statement.setInt(2, groupid);
            ResultSet rs = statement.executeQuery();

            if (rs.next()) {
                int count = rs.getInt("count(*)");
                return (count > 0);
            }
            statement.close();
            return true;
        } catch (java.sql.SQLException e) {
            System.err.println("SQL error!");
            System.out.println(e.getLocalizedMessage());
            return true;
        }
    }

    public boolean changeGroupMembers(String addToGroup, int groupid, int userid) {
        String insertStatement = "INSERT INTO user_groups (group_id, user_id) VALUES (?, ?)";
        String deleteStatement = "DELETE FROM user_groups WHERE group_id = (?) && user_id = (?)";
        try {
            PreparedStatement statement;

            if (addToGroup.equals("add") && !isUserInGroup(userid, groupid)) {
                statement = database.connection.prepareStatement(insertStatement);
            } else if (addToGroup.equals("remove")) {
                statement = database.connection.prepareStatement(deleteStatement);
            } else {
                throw new IllegalArgumentException("bad action provided in json or user already in this group");
            }

            statement.setInt(1, groupid);
            statement.setInt(2, userid);
            statement.executeUpdate();
            return true;
        } catch (java.sql.SQLException e) {
            System.err.println("SQL error!");
            System.out.println(e.getLocalizedMessage());
            return false;
        }
    }

    public ArrayList<Group> getAllGroups() {
        String statementString = "SELECT * FROM groups WHERE groups.deleted = 0";

        ArrayList<Group> groups = new ArrayList<>();

        try {
            PreparedStatement statement = database.connection.prepareStatement(statementString);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                int groupId = rs.getInt("group_id");
                Group group = new Group(
                        groupId,
                        rs.getString("group_name"),
                        getAllGroupMembers(groupId),
                        rs.getInt("can_receive_docs")
                );
                groups.add(group);
            }
            statement.close();
        return groups;
        } catch (java.sql.SQLException e) {
            System.err.println("SQL error getting all groups!");
            System.out.println(e.getLocalizedMessage());
            return null;
        }
    }

    public boolean deleteGroup(String id) {
        String INSERT_SQL = "UPDATE groups SET deleted = 1" +
                " WHERE group_id = (?)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL);
            statement.setString(1, id);
            statement.executeUpdate();
            statement.close();
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on delete group!");
            System.out.println(e.getLocalizedMessage());
            return false;
        }
        return true;
    }

    public ArrayList<Recipient> getRecipients() throws SQLException {
        ArrayList<Recipient> recipients = new ArrayList<>();
        String QUERY_SQL = "SELECT group_id, group_name FROM groups WHERE deleted != 1 && can_receive_docs = 1";
        try {
            PreparedStatement statement = database.connection.prepareStatement(QUERY_SQL);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Recipient recipient = new Recipient(
                        rs.getInt("group_id"),
                        rs.getString("group_name")
                );
                recipients.add(recipient);
            }
            statement.close();
            return recipients;
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on getting recipient list!");
            throw new SQLException("Error! " + e);
        }
    }

    public ArrayList<Group> getUserGroups(int id) throws SQLException  {
        ArrayList<Group> userGroups = new ArrayList<>();
        String SELECT_SQL = "select groups.group_id, group_name from user_groups " +
                "inner join groups " +
                "on groups.group_id = user_groups.group_id " +
                "where user_id = 1 && groups.deleted != (?)";

        try {
            PreparedStatement statement = database.connection.prepareStatement(SELECT_SQL);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Group group = new Group(
                        rs.getInt("group_id"),
                        rs.getString("group_name")
                );
                userGroups.add(group);
            }
            statement.close();
            return userGroups;
        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on getting recipient list!");
            throw new SQLException("Error! " + e);
        }
    }

    public void toggleRights(int groupId, int status) throws SQLException {
        String UPDATE_SQL = "UPDATE groups set can_receive_docs=(?) where group_id=(?)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(UPDATE_SQL);
            statement.setInt(1, status);
            statement.setInt(2, groupId);
            statement.executeUpdate();
            statement.close();

        } catch (java.sql.SQLException e) {
            System.out.println("SQL error on getting recipient list!");
            throw new SQLException("Error! " + e);
        }
    }
}
