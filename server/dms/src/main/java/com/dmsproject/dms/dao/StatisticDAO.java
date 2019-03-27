package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.Statistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Component
public class StatisticDAO {

    @Autowired
    private Database database;

    // suskaičiuoti visiems pateiktiems, priimtiems ir atmestiems dokumentams
    public Statistic countAllDocuments() throws Exception {

        String query = "SELECT COUNT(IF(document_status.status_id=2, 1, null)) 'submited', COUNT(IF(document_status.status_id=3, 1, null)) 'accepted', COUNT(IF(document_status.status_id=4, 1, null)) 'declined' " +
                "FROM documents " +
                "LEFT JOIN document_status ON document_status.document_id=documents.doc_id " +
                "WHERE document_status.`date` = (select max(`date`) from document_status where document_id = documents.doc_id)";

        Statistic statistic = new Statistic();

        PreparedStatement statement = database.connection.prepareStatement(query);
        ResultSet rs = statement.executeQuery();
        while (rs.next()) {
            statistic.setSubmited(rs.getInt("submited"));
            statistic.setAccepted(rs.getInt("accepted"));
            statistic.setDeclined(rs.getInt("declined"));
        }

        statement.close();
        System.out.println(statistic);
        return statistic;

    }
}
