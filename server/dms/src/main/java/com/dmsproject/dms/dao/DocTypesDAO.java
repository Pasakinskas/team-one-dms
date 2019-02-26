package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.DocTypes;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DocTypesDAO {
    private static final String INSERT_SQL = "INSERT INTO document_types" +
            "(String description) " +
            "values (?)";

    public static boolean addDocType(final DocTypes docTypes) {
        try {
            PreparedStatement statement = Database.connection.prepareStatement(INSERT_SQL);
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


    public static ArrayList<DocTypes> getDocTypes() {

        String query = "SELECT * FROM document_types";

        ArrayList docTypesList = new ArrayList<DocTypes>();

        try {
            PreparedStatement statement = Database.connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                DocTypes docTypes = new DocTypes();

                docTypes.setId(rs.getInt("doc_type_Id"));
                docTypes.setDescription(rs.getString("doc_type_descr"));


                docTypesList.add(docTypes);
            }

            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return docTypesList;
    }
}