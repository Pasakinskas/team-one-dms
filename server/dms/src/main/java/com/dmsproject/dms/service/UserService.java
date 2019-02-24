package com.dmsproject.dms.service;

import com.dmsproject.dms.dao.UserDAO;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {
    @Autowired
    UserDAO userDAO;

    public User getUserByEmail(String email) {
        return userDAO.getUserByEmail(email);
    }

}