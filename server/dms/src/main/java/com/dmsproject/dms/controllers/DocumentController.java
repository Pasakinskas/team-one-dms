package com.dmsproject.dms.controllers;


import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocumentDAO;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.DocTypes;
import com.dmsproject.dms.dto.Document;
import com.dmsproject.dms.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class DocumentController {
//    @Autowired
//    private TokenProvider tokenProvider;

    @Autowired
    private DocumentDAO documentDAO;

// išsaugoti dokumentą
    @RequestMapping(value = "/document/add", method = RequestMethod.POST, consumes = "application/json")
    public Integer add(@RequestBody String docContent) {
        Document document = new Document();
        document.setTypeId(1);
        document.setContent(docContent);
        return documentDAO.addDocument(document);
    }

// redaguoti dokumentą
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

// gauti dokumentą pagal dokumento id
    @RequestMapping(value = "/document/get", method = RequestMethod.GET, produces = "application/json")
    public Document getDocument(@RequestParam(name = "id") Integer id) {
        return documentDAO.getDocumentById(id);
    }

// ištraukti visiems dokumentams (admin)
    @RequestMapping (value = "/document/get/all", method = RequestMethod.GET, produces = "application/json")
    public List<DocSelection> getAll() {
        return documentDAO.getAllDocuments();
    }



// ištraukti userio pateiktus, priimtus ir atmestus dokumentus
    @RequestMapping (value = "/document/getSubmited/byUserId", method = RequestMethod.GET, produces = "application/json")
    public List<Document> getSubmitedByUserId(){
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        return documentDAO.selectSubmitedDocsByUserId(Integer.parseInt (userId));
    }


    // ištraukti userio išsaugotus dokumentus
    @RequestMapping (value = "/document/getSaved/byUserId", method = RequestMethod.GET, produces = "application/json")
    public List<Document> getSavedByUserId(){
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        return documentDAO.selectSavedDocsByUserId(Integer.parseInt (userId));
    }

    // ištraukti useriui pateiktus dokumentus
    @RequestMapping (value = "/document/get/submitedToUser", method = RequestMethod.GET, produces = "application/json")
    public List<Document> getSubmitedToUserDocs(){
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        return documentDAO.selectSubmitedToUserDocs(Integer.parseInt (userId));
    }

}



