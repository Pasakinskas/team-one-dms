package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.Statistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class StatisticDAO {

    @Autowired
    private Database database;

    public Statistic countDocuments() throws Exception {

        String query = "SELECT * FROM document_types WHERE doc_type_Id = ?";

        Statistic statistic = new Statistic();

        PreparedStatement statement = database.connection.prepareStatement(query);
        ResultSet rs = statement.executeQuery();
        while (rs.next()) {
            statistic.setSubmited(rs.getInt("doc_type_Id"));
            statistic.setAccepted(rs.getInt("doc_type_descr"));
            statistic.setDeclined(rs.getInt("doc_template"));
        }

        statement.close();
        System.out.println(statistic);
        return statistic;

    }
}
