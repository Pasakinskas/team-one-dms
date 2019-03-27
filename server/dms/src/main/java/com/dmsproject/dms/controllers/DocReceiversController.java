package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocReceiversDAO;
import com.dmsproject.dms.dao.EventsDAO;
import com.dmsproject.dms.dto.DocReceivers;
import com.dmsproject.dms.dto.DocStatus;
import com.dmsproject.dms.dto.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class DocReceiversController {

    @Autowired
    private DocReceiversDAO docReceiversDAO;

    // Įrašyti dokumento statusą
    @Secured("ROLE_USER")
    @RequestMapping(value = "/receivers/put/change", method = RequestMethod.PUT)
//    public void add(@RequestBody DocReceivers docReceivers) throws Exception{
//
//        docReceiversDAO.addDocReceiver(docReceivers);
//    }

    public void add(@RequestParam Integer docId,
                    @RequestParam (required = false) Integer recUserId,
                    @RequestParam (required = false) Integer recGroupId) throws Exception {
        DocReceivers docReceivers = new DocReceivers();
        docReceivers.setDocId(docId);
        docReceivers.setRecUserId(recUserId);
        docReceivers.setRecGroupId(recGroupId);

        docReceiversDAO.addDocReceiver(docReceivers);

    }
}
