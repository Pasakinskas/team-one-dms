package com.dmsproject.dms.controllers;


import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocumentDAO;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class DocumentController {
    @Autowired
    private DocumentDAO documentDAO;

//    @RequestMapping(value = "/document/add", method = RequestMethod.POST)
//    public Boolean add(@RequestParam("docNum") String docNum,
//                       @RequestParam("docTypeId") Integer docTypeId,
//                       @RequestParam("docName") String docName,
//                       @RequestParam("docContent") String docContent,
//                       @RequestParam("docReceiver") String docReceiver){
//
//    }

    @RequestMapping(value = "/document/add", method = RequestMethod.POST, consumes = "application/json")
    public Boolean add(@RequestBody String docContent) {
        Document document = new Document();
        document.setTypeId(1);
        document.setContent(docContent);
        return documentDAO.addDocument(document);
    }


    @RequestMapping (value = "/document/get/all", method = RequestMethod.GET, produces = "application/json")
    public List<DocSelection> getAll() {
        return documentDAO.getAllDocuments();
    }

//    @RequestMapping (value = "/document/get/byUserId", method = RequestMethod.GET, produces = "application/json")
//    public List<DocSelection> getByUserId() {
//         Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getCredentials();
//        return DocumentDAO.searchByUser(userId);
//    }

}
