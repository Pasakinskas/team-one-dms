package com.dmsproject.dms.service;

import com.dmsproject.dms.dao.GroupDAO;
import com.dmsproject.dms.dao.UserDAO;
import com.dmsproject.dms.dto.Recipient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Component
public class RecipientService {
    @Autowired
    private GroupDAO groupDAO;

    @Autowired
    private UserDAO userDAO;

    public Map<String, ArrayList<Recipient>> getAllRecipients() throws SQLException {
        try {
            Map<String, ArrayList<Recipient>> recipients = new HashMap<>();
            ArrayList<Recipient> groupRecipients = groupDAO.getRecipients();
            ArrayList<Recipient> userRecipients = userDAO.getRecipients();

            recipients.put("users", userRecipients);
            recipients.put("groups", groupRecipients);
            return recipients;
        } catch (SQLException e) {
            throw new SQLException(e.toString());
        }

    }
}
