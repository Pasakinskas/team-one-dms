package com.dmsproject.dms.dao;

import com.dmsproject.dms.Database;
import org.springframework.beans.factory.annotation.Autowired;
import com.dmsproject.dms.dto.Events;
import org.springframework.stereotype.Component;
import java.sql.PreparedStatement;


@Component
public class EventsDAO {
    @Autowired
    private Database database;

    public boolean addNewEvent(Events events) {
        String query = "INSERT INTO events " +
                "(doc_id, event_type_id, user_id) " +
                "values (?, ?, ?)";

        try {
            PreparedStatement statement = database.connection.prepareStatement(query);
            statement.setInt(1, events.getDocId());
            statement.setInt(2, events.getEventTypeId());
            statement.setInt(3, events.getUserId());

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
