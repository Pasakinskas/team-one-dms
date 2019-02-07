package com.dmsproject.dms.controllers;


import com.dmsproject.dms.dto.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController()
public class DocumentController {

    @RequestMapping(value = "/document/get", method = RequestMethod.GET, produces = "application/json")
    public Document get(@RequestParam("id") Integer id) {
        Document document = new Document();
        document.setId(id);
        return document;
    }
}
