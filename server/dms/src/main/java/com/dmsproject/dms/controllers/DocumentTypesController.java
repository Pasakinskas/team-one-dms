package com.dmsproject.dms.controllers;

import com.dmsproject.dms.Constants;
import com.dmsproject.dms.dao.DocTypesDAO;
import com.dmsproject.dms.dto.DocTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@CrossOrigin(origins = Constants.REACT_URL)
public class DocumentTypesController {

    @Autowired
    private DocTypesDAO docTypesDAO;


// gauti dokumento šabloną pagal dokumento tipo id
    @Secured("ROLE_USER")
    @RequestMapping(value = "/doctemplates/get/byId", method = RequestMethod.GET, produces = "application/json")
    public DocTypes getDocTemplate(@RequestParam(name = "id") Integer id) throws  Exception {
        return docTypesDAO.getDocTemplateByType(id);
    }

// gauti dokumentų šablonų sąrašą
    @Secured("ROLE_USER")
    @RequestMapping(value = "/doctemplates/get/all", method = RequestMethod.GET, produces = "application/json")
    public List<DocTypes> getDocTypes() throws  Exception {
        return docTypesDAO.getDocTypes();
    }

// sukurti naują dokumento šabloną
    @Secured("ROLE_MANAGER")
    @RequestMapping(value = "/doctemplate/put/new", method = RequestMethod.PUT)
    public Boolean add(@RequestParam(name = "description") String description,
                       @RequestParam(name = "template") String template) throws  Exception {
        DocTypes docTypes = new DocTypes();
        docTypes.setDescription(description);
        docTypes.setTemplate(template);

        return docTypesDAO.addDocTemplate(docTypes);
    }

// redaguoti dokumento šabloną
    @Secured("ROLE_MANAGER")
    @RequestMapping(value = "/doctemplate/put/edit", method = RequestMethod.PUT)
    public void edit(@RequestParam(name = "id") Integer id,
                     @RequestParam(name = "description") String description,
                     @RequestParam(name = "template") String template) throws Exception {
        DocTypes docTypes = new DocTypes();
        docTypes.setId(id);
        docTypes.setDescription(description);
        docTypes.setTemplate(template);

        docTypesDAO.editDocTemplate(docTypes);
    }

// ištrinti dokumento šabloną
    @Secured("ROLE_MANAGER")
    @RequestMapping(value = "/doctemplate/delete", method = RequestMethod.DELETE)
    public void delete(@RequestParam(name = "docTypeId") Integer docTypeId) throws Exception {
        docTypesDAO.deleteTemplate(docTypeId);
    }
}


