package com.dmsproject.dms.controllers;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dmsproject.dms.GreetMessage;

@RestController
public class Registration {
	
	public GreetMessage msg;
	
	@ResponseBody
    @RequestMapping(
		value = "/register",
		method = RequestMethod.POST,
		produces = "application/json",
		consumes = "application/json"
	)

    public String postGreetMessage(@RequestBody GreetMessage msg) {
    	System.out.println("I have received a post request");
    	setMessage(msg);
    	return youPosted(msg.getContent());
    }
    
    public String youPosted(String cont) {
        return "Thanks for using post here, your content is " + cont;
    }
    
    @RequestMapping(
		value = "/register",
		method = RequestMethod.GET
	)
    public String pleasePostHere() {
    	return "You just made a get request. Please use post here";
    }
    
    void setMessage(GreetMessage message) {
    	this.msg = message;
    }
}
