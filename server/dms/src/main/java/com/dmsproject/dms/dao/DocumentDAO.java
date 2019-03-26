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

// išsaugoti dokumentą
    public Integer addDocument(Document document) throws Exception {
        String query = "INSERT INTO documents" +
                "(doc_type_id, doc_name, doc_number, doc_content) " +
                "values (?, ?, ?, ?)";

        Integer docId = null;
        PreparedStatement statement = database.connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, document.getTypeId());
        statement.setString(2, document.getName());
        statement.setString(3, document.getNumber());
        statement.setString(4, document.getContent());

        statement.executeUpdate();

        ResultSet rs = statement.getGeneratedKeys();
        if (rs.next()) {
            docId = rs.getInt(1);
        }

        DocStatus docStatus = new DocStatus();
        docStatus.setDocId(docId);
        docStatus.setStatusId(1);
        docStatus.setUserId(Integer.parseInt((String) SecurityContextHolder.getContext().getAuthentication().getCredentials()));

        docStatusDAO.addDocStatus(docStatus);

        statement.close();
        return docId;
    }

    // redaguoti dokumentą
    public void editDocument(Document document) throws Exception {
        String query = " UPDATE documents"
                + " SET doc_type_id = ?, "
                + " doc_name = ?, "
                + " doc_number = ?, "
                + " doc_content = ? "
                + " WHERE doc_id = ? ";

            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setInt(1, document.getTypeId());
            statement.setString(2, document.getName());
            statement.setString(3, document.getNumber());
            statement.setString(4, document.getContent());
            statement.setInt(5, document.getId());

            statement.executeUpdate();
            statement.close();

    }

    // gauti dokumentą pagal dokumento id
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

    // gauti visų pateiktų, priimtų, atmestų dokumentų sąrašą (adminui)
    public ArrayList<DocSelection> getAllDocuments() throws Exception{

        String query1 = "SELECT documents.doc_id, documents.doc_number, CONCAT(users.name, ' ', users.surname) AS doc_owner, documents.doc_name, `status`.status_descr, document_status.doc_status_descr AS details, document_status.`date`, CONCAT_WS('', receiving_user.position, ' ', receiving_user.name, ' ', receiving_user.surname, ' ', `groups`.group_name) AS receiver " +
                "FROM documents " +
                "LEFT JOIN document_types ON documents.doc_type_id=document_types.doc_type_id " +
                "LEFT JOIN document_status ON documents.doc_id=document_status.document_id " +
                "LEFT JOIN status ON document_status.status_id=`status`.status_id " +
                "LEFT JOIN document_receiver ON documents.doc_id=document_receiver.doc_id " +
                "LEFT JOIN users AS receiving_user ON document_receiver.receiv_user_id=receiving_user.user_id " +
                "LEFT JOIN `groups` ON `groups`.group_id=document_receiver.receiv_group_id " +
                "LEFT JOIN users ON document_status.user_id=users.user_id " +
                "WHERE document_status.status_id  IN (2, 3, 4, 5) and document_status.`date` = (select max(`date`) from document_status where document_id = documents.doc_id) " +
                "ORDER BY date DESC";


        ArrayList documentsList = new ArrayList<DocSelection>();

            PreparedStatement statement = database.connection.prepareStatement(query1);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                DocSelection docSelection = new DocSelection();

                docSelection.setId(rs.getInt("doc_id"));
                docSelection.setNumber(rs.getString("doc_number"));
                docSelection.setOwner(rs.getString("doc_owner"));
                docSelection.setDocName(rs.getString("doc_name"));
                docSelection.setStatus(rs.getString("status_descr"));
                docSelection.setDetails(rs.getString("details"));
                docSelection.setDate(rs.getString("date"));
                docSelection.setReceiver(rs.getString("receiver"));

                documentsList.add(docSelection);
            }

            statement.close();

        return documentsList;
    }

    // user'io pateikti, priimti, atmesti dokumentai
    public ArrayList<Document> selectSubmitedDocsByUserId(int id) throws  Exception {

        String query2 = "SELECT documents.doc_id, documents.doc_number, documents.doc_name, `status`.status_descr, document_status.doc_status_descr AS details, document_status.`date`, CONCAT_WS('', receiving_user.position, ' ', receiving_user.name, ' ', receiving_user.surname, ' ', `groups`.group_name) AS receiver " +
                "FROM documents " +
                "LEFT JOIN document_types ON documents.doc_type_id=document_types.doc_type_id " +
                "LEFT JOIN document_status ON documents.doc_id=document_status.document_id " +
                "LEFT JOIN status ON document_status.status_id=`status`.status_id " +
                "LEFT JOIN document_receiver ON documents.doc_id=document_receiver.doc_id " +
                "LEFT JOIN users AS receiving_user ON document_receiver.receiv_user_id=receiving_user.user_id " +
                "LEFT JOIN `groups` ON `groups`.group_id=document_receiver.receiv_group_id " +
                "LEFT JOIN users ON document_status.user_id=users.user_id " +
                "WHERE document_status.status_id IN (2, 3, 4) AND users.user_id=? AND document_status.`date` = (select max(`date`) from document_status where document_id = documents.doc_id) " +
                "ORDER BY date DESC";

        ArrayList documentsList = new ArrayList<Document>();

            PreparedStatement statement = database.connection.prepareStatement(query2);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                DocSelection docSelection = new DocSelection();

                docSelection.setId(rs.getInt("doc_id"));
                docSelection.setNumber(rs.getString("doc_number"));
                docSelection.setDocName(rs.getString("doc_name"));
                docSelection.setStatus(rs.getString("status_descr"));
                docSelection.setDetails(rs.getString("details"));
                docSelection.setDate(rs.getString("date"));
                docSelection.setReceiver(rs.getString("receiver"));

                documentsList.add(docSelection);
            }

            statement.close();

        return documentsList;
    }

// user'io išsaugoti dokumentai

    public ArrayList<Document> selectSavedDocsByUserId(int id) {

        String query2 = "SELECT documents.doc_id, documents.doc_number, documents.doc_name, `status`.status_descr, document_status.`date` " +
                "FROM documents " +
                "LEFT JOIN document_status ON documents.doc_id=document_status.document_id " +
                "LEFT JOIN status ON document_status.status_id=`status`.status_id " +
                "LEFT JOIN users ON document_status.user_id=users.user_id " +
                "WHERE document_status.status_id=1 AND users.user_id=? " +
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
                docSelection.setDocName(rs.getString("doc_name"));
                docSelection.setStatus(rs.getString("status_descr"));
                docSelection.setDate(rs.getString("date"));


                documentsList.add(docSelection);
            }

            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return documentsList;
    }

// Useriui pateikti dokumentai pasirašymui

    public ArrayList<Document> selectSubmitedToUserDocs(int id) throws  Exception {

        String query = "SELECT DISTINCT documents.doc_id, documents.doc_number, CONCAT(users.name, ' ', users.surname) AS doc_owner, documents.doc_name, `status`.status_descr, document_status.doc_status_descr AS details, document_status.`date`, CONCAT_WS('', receiving_user.position, ' ', receiving_user.name, ' ', receiving_user.surname, ' ', `groups`.group_name) AS receiver " +
                "LEFT JOIN document_types ON documents.doc_type_id=document_types.doc_type_id " +
                "LEFT JOIN document_status ON documents.doc_id=document_status.document_id " +
                "LEFT JOIN status ON document_status.status_id=`status`.status_id " +
                "LEFT JOIN document_receiver ON documents.doc_id=document_receiver.doc_id " +
                "LEFT JOIN users AS receiving_user ON document_receiver.receiv_user_id=receiving_user.user_id " +
                "LEFT JOIN `groups` ON `groups`.group_id=document_receiver.receiv_group_id " +
                "LEFT JOIN user_groups ON receiving_user.user_id=user_groups.user_id " +
                "LEFT JOIN users ON document_status.user_id=users.user_id " +
                "WHERE status.status_id=2 AND (receiving_user.user_id=? OR receiv_group_id IN (SELECT user_groups.group_id FROM user_groups WHERE user_groups.user_id=?)) " +
                "ORDER BY date DESC";

        ArrayList documentsList = new ArrayList<Document>();

            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setInt(2, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                DocSelection docSelection = new DocSelection();

                docSelection.setId(rs.getInt("doc_id"));
                docSelection.setNumber(rs.getString("doc_number"));
                docSelection.setOwner(rs.getString("doc_owner"));
                docSelection.setDocName(rs.getString("doc_name"));
                docSelection.setDate(rs.getString("date"));
                docSelection.setReceiver(rs.getString("receiver"));

                documentsList.add(docSelection);
            }

            statement.close();

        return documentsList;
    }
}
