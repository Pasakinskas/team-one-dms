package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.DocStatus;

import java.sql.PreparedStatement;

public class DocStatusDAO {
    private static final String INSERT_SQL = "INSERT INTO document_status" +
            "(int statusId, int docId, int userId, String description, String date) " +
            "values (?, ?, ?, ?, ?)";

    public static boolean addDocStatus(final DocStatus docStatus) {
        try {
            PreparedStatement statement = Database.connection.prepareStatement(INSERT_SQL);
            statement.setInt(1, docStatus.getStatusId());
            statement.setInt( 2, docStatus.getDocId());
            statement.setInt( 3, docStatus.getUserId());
            statement.setString(4, docStatus.getDescription());
            statement.setString(5, docStatus.getDate());

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
