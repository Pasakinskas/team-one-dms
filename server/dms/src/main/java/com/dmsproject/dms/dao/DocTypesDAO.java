package com.dmsproject.dms.dao;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dto.DocTypes;

import java.sql.PreparedStatement;

public class DocTypesDAO {
    private static final String INSERT_SQL = "INSERT INTO document_types" +
            "(String description) " +
            "values (?)";

    public static boolean addDocType(final DocTypes docTypes) {
        try {
            PreparedStatement statement = Constants.connection.prepareStatement(INSERT_SQL);
            statement.setString(1, docTypes.getDescription());

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
