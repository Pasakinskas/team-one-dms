package com.dmsproject.dms.dao;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dto.Status;

import java.sql.PreparedStatement;

public class StatusDAO {
    private static final String INSERT_SQL = "INSERT INTO status" +
            "(String description) " +
            "values (?)";

    public static boolean addDocType(final Status status) {
        try {
            PreparedStatement statement = Constants.connection.prepareStatement(INSERT_SQL);
            statement.setString(1, status.getDescription());

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
