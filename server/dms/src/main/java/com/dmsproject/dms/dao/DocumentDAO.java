package com.dmsproject.dms.dao;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dto.Document;

import java.sql.PreparedStatement;

public class DocumentDAO {
    private static final String INSERT_SQL = "INSERT INTO documents" +
            "(doc_type_id, doc_name, doc_number, doc_content) " +
            "values (?, ?, ?, ?)";

    public static boolean addDocument(final Document document) {
        try {
            PreparedStatement statement = Constants.connection.prepareStatement(INSERT_SQL);
            statement.setInt(1, document.getTypeId());
            statement.setString(2, document.getName());
            statement.setInt( 3, document.getNumber());
            statement.setString(4, document.getContent());

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
