package com.dmsproject.dms.controllers;


import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocReceiversDAO;
import com.dmsproject.dms.dao.DocStatusDAO;
import com.dmsproject.dms.dao.DocumentDAO;
import com.dmsproject.dms.dto.DocReceivers;
import com.dmsproject.dms.dto.DocSelection;
import com.dmsproject.dms.dto.Document;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class DocumentController {

    @Autowired
    private DocumentDAO documentDAO;

    @Autowired
    private DocStatusDAO docStatusDAO;

    @Autowired
    private DocReceiversDAO docReceiversDAO;

// išsaugoti dokumentą
    @Secured("ROLE_USER")
    @RequestMapping(value = "/document/put/new", method = RequestMethod.PUT, consumes = "application/json")
    public Integer add(@RequestBody JsonNode documentAndData) throws Exception{
        Document document = new Document(
                documentAndData.get("number").asText(),
                documentAndData.get("typeId").asInt(),
                documentAndData.get("name").asText(),
                documentAndData.get("content").asText()
        );
        Integer documentId = documentDAO.addDocument(document);
        String recipientType = documentAndData.get("recipientType").asText();
        Integer recipientId = documentAndData.get("recipient").asInt();

        DocReceivers docReceivers = new DocReceivers();
        docReceivers.setDocId(documentId);
        if (recipientType.equals("group")) {
            docReceivers.setRecGroupId(recipientId);
        } else if (recipientType.equals("user")) {
            docReceivers.setRecUserId(recipientId);
        }

        docReceiversDAO.addDocReceiver(docReceivers);

        return documentId;
    }

// redaguoti dokumentą
    @Secured("ROLE_USER")
    @RequestMapping(value = "/document/put/edit", method = RequestMethod.PUT)
    public void edit(@RequestParam(name = "doc_id") Integer id,
                     @RequestParam(name = "doc_type_id") Integer TypeId,
                     @RequestParam(name = "doc_name") String name,
                     @RequestParam(name = "doc_number") String number,
                     @RequestParam(name = "doc_content") String content) throws Exception {
        Document document = new Document();
        document.setId(id);
        document.setTypeId(TypeId);
        document.setName(name);
        document.setNumber(number);
        document.setContent(content);

        documentDAO.editDocument(document);
    }

// gauti dokumentą pagal dokumento id
    @Secured("ROLE_USER")
    @RequestMapping(value = "/document/get/byId", method = RequestMethod.GET, produces = "application/json")
    public Document getDocument(@RequestParam(name = "id") Integer id) throws  Exception {
        return documentDAO.getDocumentById(id);
    }

// ištraukti visiems dokumentams (admin)
    @Secured("ROLE_ADMIN")
    @RequestMapping (value = "/document/get/all", method = RequestMethod.GET, produces = "application/json")
    public List<DocSelection> getAll() throws Exception{
        return documentDAO.getAllDocuments();
    }



// ištraukti userio pateiktus, priimtus ir atmestus dokumentus
    @Secured("ROLE_USER")
    @RequestMapping (value = "/document/get/submited", method = RequestMethod.GET, produces = "application/json")
    public List<Document> getSubmitedByUserId()throws Exception{
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        return documentDAO.selectSubmitedDocsByUserId(Integer.parseInt (userId));
    }


    // ištraukti userio išsaugotus dokumentus
    @Secured("ROLE_USER")
    @RequestMapping (value = "/document/get/saved", method = RequestMethod.GET, produces = "application/json")
    public List<Document> getSavedByUserId() throws  Exception {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        return documentDAO.selectSavedDocsByUserId(Integer.parseInt (userId));
    }

    // ištraukti useriui pateiktus dokumentus
    @Secured("ROLE_MANAGER")
    @RequestMapping (value = "/document/get/geted", method = RequestMethod.GET, produces = "application/json")
    public List<Document> getSubmitedToUserDocs() throws Exception {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        return documentDAO.selectSubmitedToUserDocs(Integer.parseInt (userId));
    }

// ištrinti išsaugotą dokumentą
    @Secured("ROLE_USER")
    @RequestMapping(value = "/document/delete", method = RequestMethod.DELETE)
    public void deleteDoc(@RequestParam ("id") Integer id) throws Exception{

        docStatusDAO.deleteStatus(id);
        documentDAO.deleteDocument(id);
    }
}



