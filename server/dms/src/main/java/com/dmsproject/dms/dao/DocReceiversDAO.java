package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import com.dmsproject.dms.dto.DocReceivers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.sql.PreparedStatement;

@Component
public class DocReceiversDAO {
    @Autowired
    private Database database;

    public void addDocReceiver(DocReceivers docReceivers) throws  Exception {
        String query = "INSERT INTO document_receiver" +
                "(doc_id, receiv_user_id, receiv_group_id) " +
                "values (?, ?, ?)";

        PreparedStatement statement = database.connection.prepareStatement(query);
        statement.setInt ( 1, docReceivers.getDocId());
        statement.setInt( 2, docReceivers.getRecUserId());
        statement.setInt(3, docReceivers.getRecGroupId());

        statement.executeUpdate();
        statement.close();
    }
}
