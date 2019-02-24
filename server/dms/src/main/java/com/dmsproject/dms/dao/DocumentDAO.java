package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.Document;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DocumentDAO {
    private static final String INSERT_SQL = "INSERT INTO documents" +
            "(doc_type_id, doc_name, doc_number, doc_content) " +
            "values (?, ?, ?, ?)";

    public static boolean addDocument(final Document document) {
        try {
            PreparedStatement statement = Database.connection.prepareStatement(INSERT_SQL);
            statement.setInt(1, document.getTypeId());
            statement.setString(2, document.getName());
            statement.setString(3, document.getNumber());
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


    public static ArrayList<DocSelection> getAllDocuments() {

        String query = "SELECT documents.doc_number, users.name, users.surname, document_types.doc_type_descr, documents.doc_name, status.status_descr, document_status.date, document_status.doc_status_descr " +
                "FROM document_status " +
                "INNER JOIN documents ON document_status.document_id=documents.doc_id " +
                "INNER JOIN users ON document_status.user_id=users.user_id " +
                "INNER JOIN status ON document_status.status_id= status.status_id " +
                "INNER JOIN document_types ON documents.doc_type_id=document_types.doc_type_id";

        ArrayList documentsList = new ArrayList<DocSelection>();

        try {
            PreparedStatement statement = Database.connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                DocSelection docSelection = new DocSelection();

                docSelection.setNumber(rs.getString("doc_number"));
                docSelection.setUserName(rs.getString("name"));
                docSelection.setUserSurname(rs.getString("surname"));
                docSelection.setType(rs.getString("doc_type_descr"));
                docSelection.setName(rs.getString("doc_name"));
                docSelection.setStatus(rs.getString("status_descr"));
                docSelection.setDate(rs.getString("date"));
                docSelection.setStatusDescr(rs.getString("doc_status_descr"));


                documentsList.add(docSelection);
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
            PreparedStatement statement = Database.connection.prepareStatement(INSERT_SQL);
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
