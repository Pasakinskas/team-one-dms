package com.dmsproject.dms.service;

import com.dmsproject.dms.dao.GroupDAO;
import com.dmsproject.dms.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;

public class RecipientService {
    @Autowired
    private GroupDAO groupDAO;

    @Autowired
    private UserDAO userDAO;

    public void getAllRecipients() {

    }
}
