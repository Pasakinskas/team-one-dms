package com.dmsproject.dms.dao;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dto.Document;

import java.sql.*;
import java.util.ArrayList;

public class DocumentDAO {
    private static final String INSERT_SQL = "INSERT INTO documents" +
            "(doc_type_id, doc_name, doc_number, doc_content) " +
            "values (?, ?, ?, ?)";

    public static boolean addDocument(final Document document) {
        try {
            PreparedStatement statement = Constants.connection.prepareStatement(INSERT_SQL);
            statement.setInt(1, document.getTypeId());
            statement.setString(2, document.getName());
            statement.setString( 3, document.getNumber());
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



    public static ArrayList<Document> getAllDocuments() {

        String query = "SELECT * FROM documents";

        ArrayList documentsList = new ArrayList<Document>();

        try {
            PreparedStatement statement = Constants.connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Document document = new Document();
                document.setId(rs.getInt("doc_id"));
                document.setTypeId(rs.getInt("doc_type_id"));
                document.setName(rs.getString("doc_name"));
                document.setNumber(rs.getString("doc_number"));
                document.setContent(rs.getString("doc_content"));

                documentsList.add(document);
            }

            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return documentsList;
    }

    public static ArrayList<Document> searchByUser(int id) {


        String query = "SELECT document_status.user_id, documents.doc_id, documents.doc_type_id, documents.doc_name, documents.doc_number, documents.doc_content " +
                " FROM documents " +
                " INNER JOIN document_status ON documents.doc_id=document_status.document_id " +
                " WHERE document_status.user_id=1";

        ArrayList documentsList = new ArrayList<Document>();

        try {
            PreparedStatement statement = Constants.connection.prepareStatement(INSERT_SQL);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Document document = new Document();
                document.setId(rs.getInt("doc_id"));
                document.setTypeId(rs.getInt("doc_type_id"));
                document.setName(rs.getString("doc_name"));
                document.setNumber(rs.getString("doc_number"));
                document.setContent(rs.getString("doc_content"));

                documentsList.add(document);
            }

            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return documentsList;
    }


}
