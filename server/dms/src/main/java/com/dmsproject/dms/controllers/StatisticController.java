package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.StatisticDAO;
import com.dmsproject.dms.dto.Statistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class StatisticController {
    @Autowired
    private StatisticDAO statisticDAO;

    @Secured("ROLE_USER")
    @RequestMapping(value = "/statistic/get/all", method = RequestMethod.GET, produces = "application/json")
    public Statistic getStatistic() throws  Exception {
        return statisticDAO.countAllDocuments();
    }

}
