package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.Document;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@Component
public class DocumentDAO {

    @Autowired
    private Database database;

    private static final String INSERT_SQL = "INSERT INTO documents" +
            "(doc_type_id, doc_name, doc_number, doc_content) " +
            "values (?, ?, ?, ?)";

    public boolean addDocument(final Document document) {
        try {
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL);
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


    public ArrayList<DocSelection> getAllDocuments() {

        String query1 = "SELECT documents.doc_number, users.name, users.surname, document_types.doc_type_descr, documents.doc_name, status.status_descr, document_status.date, document_status.doc_status_descr " +
                "FROM document_status " +
                "INNER JOIN documents ON document_status.document_id=documents.doc_id " +
                "INNER JOIN users ON document_status.user_id=users.user_id " +
                "INNER JOIN status ON document_status.status_id= status.status_id " +
                "INNER JOIN document_types ON documents.doc_type_id=document_types.doc_type_id";

        ArrayList documentsList = new ArrayList<DocSelection>();

        try {
            PreparedStatement statement = database.connection.prepareStatement(query1);
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


    public ArrayList<Document> searchByUser(int id) {

        String query2 = "SELECT documents.doc_number, users.name, users.surname, document_types.doc_type_descr, documents.doc_name, status.status_descr, document_status.date, document_status.doc_status_descr " +
                "FROM document_status " +
                "INNER JOIN documents ON document_status.document_id=documents.doc_id " +
                "INNER JOIN users ON document_status.user_id=users.user_id " +
                "INNER JOIN status ON document_status.status_id= status.status_id " +
                "INNER JOIN document_types ON documents.doc_type_id=document_types.doc_type_id " +
                "WHERE users.user_id = ? ";

        ArrayList documentsList = new ArrayList<Document>();

        try {
            PreparedStatement statement = database.connection.prepareStatement(query2);
            statement.setInt(1, id);
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
}
