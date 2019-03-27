package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.DocTypes;
import com.dmsproject.dms.dto.Document;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;

@Component
public class DocTypesDAO {

    @Autowired
    private Database database;

    public boolean addDocTemplate (DocTypes docTypes){
        String query = "INSERT INTO document_types " +
            "(doc_type_descr, doc_template) " +
            "values (?, ?)";
        try {
            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setString(1, docTypes.getDescription());
            statement.setString(2, docTypes.getTemplate());

            statement.executeUpdate();
            statement.close();
        } catch (java.sql.SQLException e) {
            System.out.println("Error adding to database");
            System.out.println(e);
            return false;
        }
        return true;
    }

    public void editDocTemplate(DocTypes docTypes) {
        String query = " UPDATE document_types "
                + " SET doc_type_descr = ?, "
                + " doc_template = ? "
                + " WHERE doc_type_id = ? ";

        try {
            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setString(1, docTypes.getDescription());
            statement.setString(2, docTypes.getTemplate());
            statement.setInt(3, docTypes.getId());

            statement.executeUpdate();
            statement.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteTemplate(int id) throws Exception {

        String query = "DELETE FROM document_types WHERE doc_type_id = ? ";

            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setInt(1, id);

            statement.executeUpdate();
            statement.close();

    }


    public DocTypes getDocTemplateByType(int id) throws  Exception {

        String query = "SELECT * FROM document_types WHERE doc_type_Id = ?";

        DocTypes docTypes = new DocTypes();

            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                docTypes.setId(rs.getInt("doc_type_Id"));
                docTypes.setDescription(rs.getString("doc_type_descr"));
                docTypes.setTemplate(rs.getString("doc_template"));
                }

                statement.close();

            return docTypes;
        }

    public ArrayList<DocTypes> getDocTypes() throws  Exception {

        String query = "SELECT doc_type_Id, doc_type_descr FROM document_types";

        ArrayList docTypesList = new ArrayList<DocTypes>();

            PreparedStatement statement = database.connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                DocTypes docTypes = new DocTypes();

                docTypes.setId(rs.getInt("doc_type_Id"));
                docTypes.setDescription(rs.getString("doc_type_descr"));

                docTypesList.add(docTypes);
            }

            statement.close();

        return docTypesList;
    }


}