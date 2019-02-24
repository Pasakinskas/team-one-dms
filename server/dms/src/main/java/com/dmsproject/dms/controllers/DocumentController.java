package com.dmsproject.dms.controllers;


import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocumentDAO;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class DocumentController {

    @RequestMapping(value = "/document/get/all", method = RequestMethod.GET, produces = "application/json")
    public List<Document> getAllDocuments() {
        return DocumentDAO.getAllDocuments();
    }

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
        return DocumentDAO.addDocument(document);
    }


    @RequestMapping (value = "/document/get/all", method = RequestMethod.GET, produces = "application/json")
    public List<DocSelection> getAll() {
        return DocumentDAO.getAllDocuments();
    }

//    @RequestMapping (value = "/document/get/byId", method = RequestMethod.GET, produces = "application/json")
//    public List<DocSelection> getAll(HttpServletRequest httpServletRequest) {
//        return DocumentDAO.getAllDocuments();
//    }

}
