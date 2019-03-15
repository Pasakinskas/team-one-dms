package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

@Component
public class DocumentDAO {

    @Autowired
    private Database database;

    @Autowired
    DocStatusDAO docStatusDAO;

    private static final String INSERT_SQL = "INSERT INTO documents" +
            "(doc_type_id, doc_name, doc_number, doc_content) " +
            "values (?, ?, ?, ?)";

    public Integer addDocument(Document document) {
        Integer docId = null;
        try {
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, document.getTypeId());
            statement.setString(2, document.getName());
            statement.setString(3, document.getNumber());
            statement.setString(4, document.getContent());

            statement.executeUpdate();

            ResultSet rs = statement.getGeneratedKeys();
            if (rs.next()){
                docId = rs.getInt(1);
            }

            DocStatus docStatus = new DocStatus();
            docStatus.setDocId(docId);
            docStatus.setStatusId(1);
            docStatus.setUserId(Integer.parseInt((String) SecurityContextHolder.getContext().getAuthentication().getCredentials()));

            docStatusDAO.addDocStatus(docStatus);

            statement.close();
        } catch (java.sql.SQLException e) {
            System.out.println("Error adding to database");
            System.out.println(e);
        }
        return docId;
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

    public Document getDocumentById(int id) {

        String query = "SELECT * FROM documents WHERE doc_id = ?";

        Document document = new Document();

        try {
            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                document.setId(rs.getInt("doc_id"));
                document.setTypeId(rs.getInt("doc_type_id"));
                document.setName(rs.getString("doc_name"));
                document.setNumber(rs.getString("doc_number"));
                document.setContent(rs.getString("doc_content"));
            }

            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return document;
    }


    public ArrayList<DocSelection> getAllDocuments() {

        String query1 = "SELECT documents.doc_id, documents.doc_number, CONCAT(users.name, ' ', users.surname) AS doc_owner, documents.doc_name, `status`.status_descr, document_status.doc_status_descr AS details, document_status.`date`, `groups`.group_name AS 'receiving group', `groups`.group_id, CONCAT(receiving_user.position, ' ', receiving_user.name, ' ', receiving_user.surname) AS receiver"+
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

                docSelection.setId(rs.getInt("doc_id"));
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

        String query2 = "SELECT documents.doc_id, documents.doc_number, CONCAT(users.name, ' ', users.surname) AS doc_owner, documents.doc_name, `status`.status_descr, document_status.doc_status_descr AS details, document_status.`date`, `groups`.group_name AS 'receiving group', `groups`.group_id, CONCAT(receiving_user.position, ' ', receiving_user.name, ' ', receiving_user.surname) AS receiver " +
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

                docSelection.setId(rs.getInt("doc_id"));
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

    public ArrayList<Document> searchSubmitedDocByUser(int id) {

        String query = "SELECT documents.doc_id, documents.doc_number, CONCAT(users.name, ' ', users.surname) AS doc_owner, documents.doc_name, document_status.`date`, `groups`.group_name AS 'receiving group', `groups`.group_id, CONCAT(receiving_user.position, ' ', receiving_user.name, ' ', receiving_user.surname) AS receiver, receiving_user.user_id"+
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
        "WHERE `status`.status_id=2 AND receivers.receiv_group_id=?"+
        "union"+
        "SELECT documents.doc_id, documents.doc_number, CONCAT(users.name, ' ', users.surname) AS doc_owner, documents.doc_name, document_status.`date`, `groups`.group_name AS 'receiving group', `groups`.group_id, CONCAT(receiving_user.position, ' ', receiving_user.name, ' ', receiving_user.surname) AS receiver, receiving_user.user_id"+
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
        "WHERE `status`.status_id=2 AND receivers.receiv_user_id=?";

        ArrayList documentsList = new ArrayList<Document>();

        try {
            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setInt(1, receivGroupId);
            statement.setInt(2, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                DocSelection docSelection = new DocSelection();

                docSelection.setId(rs.getInt("doc_id"));
                docSelection.setNumber(rs.getString("doc_number"));
                docSelection.setOwnerName(rs.getString("name"));
                docSelection.setOwnerSurname(rs.getString("surname"));
                docSelection.setDocName(rs.getString("doc_name"));
                docSelection.setDate(rs.getString("date"));
                docSelection.setReceivGroupName(rs.getString("group_name"));
                docSelection.setReceivGroupId(rs.getInt("group_id"));
                docSelection.setReceiverPosition(rs.getString("position"));
                docSelection.setReceiverName(rs.getString("name"));
                docSelection.setReceiverSurname(rs.getString("surname"));
                docSelection.setReceiverId(rs.getInt("user_id"));


                documentsList.add(docSelection);
            }

            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return documentsList;
    }
}
