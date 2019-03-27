package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocStatusDAO;
import com.dmsproject.dms.dao.EventsDAO;
import com.dmsproject.dms.dto.DocStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class DocStatusController {
    @Autowired
    private DocStatusDAO docStatusDAO;

    @Autowired
    private EventsDAO eventsDAO;


    // Įrašyti dokumento statusą
    @Secured("ROLE_USER")
    @RequestMapping(value = "/status/put/change", method = RequestMethod.PUT)
    public void add(@RequestParam Integer docId,
                    @RequestParam Integer statusId,
                    @RequestParam String description) throws Exception {
        DocStatus docStatus = new DocStatus();
        docStatus.setDocId(docId);
        docStatus.setStatusId(statusId);
        docStatus.setDescription(description);
        docStatus.setUserId(Integer.parseInt((String) SecurityContextHolder.getContext().getAuthentication().getCredentials()));

        docStatusDAO.addDocStatus(docStatus);

    }
}


