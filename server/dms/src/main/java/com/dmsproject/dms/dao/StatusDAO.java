package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.Status;
import org.springframework.beans.factory.annotation.Autowired;

import javax.xml.crypto.Data;
import java.sql.PreparedStatement;

public class StatusDAO {

    @Autowired
    private Database database;

    private static final String INSERT_SQL = "INSERT INTO status" +
            "(String description) " +
            "values (?)";

    public boolean addDocType(final Status status) {
        try {
            PreparedStatement statement = database.connection.prepareStatement(INSERT_SQL);
            statement.setString(1, status.getDescription());

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
