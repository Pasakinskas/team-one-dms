package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocTypesDAO;
import com.dmsproject.dms.dto.DocTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class DocumentTypesController {

    @Autowired
    private DocTypesDAO docTypesDAO;


// gauti dokumento šabloną pagal dokumento tipo id
    @RequestMapping(value = "/doctemplates/get/byId", method = RequestMethod.GET, produces = "application/json")
    public DocTypes getDocTemplate(@RequestParam(name = "id") Integer id) {
        return docTypesDAO.getDocTemplateByType(id);
    }

// gauti dokumentų šablonų sąrašą
    @RequestMapping(value = "/doctemplates/get/all", method = RequestMethod.GET, produces = "application/json")
    public List<DocTypes> getDocTypes() {
        return docTypesDAO.getDocTypes();
    }

// sukurti naują dokumento šabloną
    @RequestMapping(value = "/doctemplate/post/new", method = RequestMethod.POST)
    public Boolean add(@RequestParam(name = "description") String description,
                       @RequestParam(name = "template") String template) {
        DocTypes docTypes = new DocTypes();
        docTypes.setDescription(description);
        docTypes.setTemplate(template);

        return docTypesDAO.addDocTemplate(docTypes);
    }

// redaguoti dokumento šabloną
    @RequestMapping(value = "/doctemplate/post/edit", method = RequestMethod.POST)
    public void edit(@RequestParam(name = "id") Integer id,
                     @RequestParam(name = "description") String description,
                     @RequestParam(name = "template") String template) {
        DocTypes docTypes = new DocTypes();
        docTypes.setId(id);
        docTypes.setDescription(description);
        docTypes.setTemplate(template);

        docTypesDAO.editDocTemplate(docTypes);
    }

// ištrinti dokumento šabloną
    @RequestMapping(value = "/doctemplate/delete", method = RequestMethod.DELETE)
    public void delete(@RequestParam(name = "docTypeId") Integer docTypeId) {
        docTypesDAO.deleteTemplate(docTypeId);
    }
}


