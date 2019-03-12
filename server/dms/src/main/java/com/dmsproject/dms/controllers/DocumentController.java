package com.dmsproject.dms.controllers;


import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocumentDAO;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.DocTypes;
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

    @RequestMapping(value = "/document/add", method = RequestMethod.POST, consumes = "application/json")
    public Boolean add(@RequestBody String docContent) {
        Document document = new Document();
        document.setTypeId(1);
        document.setContent(docContent);
        return documentDAO.addDocument(document);
    }

    @RequestMapping(value = "/document/edit", method = RequestMethod.POST)
    public void edit(@RequestParam(name = "doc_id") Integer id,
                     @RequestParam(name = "doc_type_id") Integer TypeId,
                     @RequestParam(name = "doc_name") String name,
                     @RequestParam(name = "doc_number") String number,
                     @RequestParam(name = "doc_content") String content) {
        Document document = new Document();
        document.setId(id);
        document.setTypeId(TypeId);
        document.setName(name);
        document.setNumber(number);
        document.setContent(content);

        documentDAO.editDocument(document);
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
