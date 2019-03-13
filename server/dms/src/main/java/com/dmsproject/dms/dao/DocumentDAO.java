package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.DocTypes;
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

    public void editDocument(Document document) {
        String query = " UPDATE documents"
                + " SET doc_type_id = ?, "
                + " doc_name = ?, "
                + " doc_number = ?, "
                + " doc_content = ? "
                + " WHERE doc_id = ? ";

        try {
            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setInt(1, document.getTypeId());
            statement.setString(2, document.getName());
            statement.setString(3, document.getNumber());
            statement.setString(4, document.getContent());
            statement.setInt(5, document.getId());

            statement.executeUpdate();
            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }



    public ArrayList<DocSelection> getAllDocuments() {

        String query1 = "SELECT documents.doc_number, CONCAT(users.name, ' ', users.surname) AS doc_owner, documents.doc_name, `status`.status_descr, document_status.doc_status_descr AS details, document_status.`date`, `groups`.group_name AS 'receiving group', `groups`.group_id, CONCAT(receiving_user.position, ' ', receiving_user.name, ' ', receiving_user.surname) AS receiver"+
        "FROM documents"+
        "LEFT JOIN document_types ON documents.doc_type_id=document_types.doc_type_id"+
        "LEFT JOIN document_status ON documents.doc_id=document_status.document_id"+
        "LEFT JOIN status ON document_status.status_id=`status`.status_id"+
        "LEFT JOIN document_receiver ON documents.doc_id=document_receiver.doc_id"+
        "LEFT JOIN receivers ON document_receiver.receiver_id=receivers.receiver_id"+
        "LEFT JOIN users AS receiving_user ON receivers.receiv_user_id=receiving_user.user_id"+
        "LEFT JOIN `groups` ON `groups`.group_id=receivers.receiv_group_id"+
        "LEFT JOIN events ON documents.doc_id=events.doc_id"+
        "LEFT JOIN users ON users.user_id=events.user_id"+
        "ORDER BY date DESC";


        ArrayList documentsList = new ArrayList<DocSelection>();

        try {
            PreparedStatement statement = database.connection.prepareStatement(query1);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                DocSelection docSelection = new DocSelection();

                docSelection.setNumber(rs.getString("doc_number"));
                docSelection.setOwnerName(rs.getString("name"));
                docSelection.setOwnerSurname(rs.getString("surname"));
                docSelection.setDocName(rs.getString("doc_name"));
                docSelection.setStatus(rs.getString("status_descr"));
                docSelection.setDetails(rs.getString("doc_status_descr"));
                docSelection.setDate(rs.getString("date"));
                docSelection.setReceivGroupName(rs.getString("group_name"));
                docSelection.setReceivGroupId(rs.getInt("group_id"));
                docSelection.setReceiverPosition(rs.getString("position"));
                docSelection.setReceiverName(rs.getString("name"));
                docSelection.setReceiverSurname(rs.getString("surname"));


                documentsList.add(docSelection);
            }

            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return documentsList;
    }


    public ArrayList<Document> searchByUser(int id) {

        String query2 = "SELECT documents.doc_number, CONCAT(users.name, ' ', users.surname) AS doc_owner, documents.doc_name, `status`.status_descr, document_status.doc_status_descr AS details, document_status.`date`, `groups`.group_name AS 'receiving group', `groups`.group_id, CONCAT(receiving_user.position, ' ', receiving_user.name, ' ', receiving_user.surname) AS receiver " +
                "FROM documents " +
                "LEFT JOIN document_types ON documents.doc_type_id=document_types.doc_type_id " +
                "LEFT JOIN document_status ON documents.doc_id=document_status.document_id " +
                "LEFT JOIN status ON document_status.status_id=`status`.status_id " +
                "LEFT JOIN document_receiver ON documents.doc_id=document_receiver.doc_id " +
                "LEFT JOIN receivers ON document_receiver.receiver_id=receivers.receiver_id " +
                "LEFT JOIN users AS receiving_user ON receivers.receiv_user_id=receiving_user.user_id " +
                "LEFT JOIN `groups` ON `groups`.group_id=receivers.receiv_group_id " +
                "LEFT JOIN events ON documents.doc_id=events.doc_id " +
                "LEFT JOIN users ON users.user_id=events.user_id " +
                "WHERE users.user_id = ? " +
                "ORDER BY date DESC";

        ArrayList documentsList = new ArrayList<Document>();

        try {
            PreparedStatement statement = database.connection.prepareStatement(query2);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                DocSelection docSelection = new DocSelection();

                docSelection.setNumber(rs.getString("doc_number"));
                docSelection.setOwnerName(rs.getString("name"));
                docSelection.setOwnerSurname(rs.getString("surname"));
                docSelection.setDocName(rs.getString("doc_name"));
                docSelection.setStatus(rs.getString("status_descr"));
                docSelection.setDetails(rs.getString("doc_status_descr"));
                docSelection.setDate(rs.getString("date"));
                docSelection.setReceivGroupName(rs.getString("group_name"));
                docSelection.setReceivGroupId(rs.getInt("group_id"));
                docSelection.setReceiverPosition(rs.getString("position"));
                docSelection.setReceiverName(rs.getString("name"));
                docSelection.setReceiverSurname(rs.getString("surname"));


                documentsList.add(docSelection);
            }

            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return documentsList;
    }
}
