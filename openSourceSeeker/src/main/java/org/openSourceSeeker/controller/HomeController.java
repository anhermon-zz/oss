package org.openSourceSeeker.controller;

import java.security.Principal;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
class HomeController {
	private static final Logger logger = Logger.getLogger(HomeController.class);
	/**
	 * @return Index page.
	 */
    @RequestMapping("/")
    String index() {
    	logger.info("index");
        return "index";
    }
    
    /** 
     * @param errorNum - error number
     * @return Corresponding error page
     */
    @RequestMapping("/error/{errorNum}")
    String error(@PathVariable int errorNum) {
    	logger.info("error/" + errorNum);
    	return "errors/" + errorNum;
    }
    
    /** 
     * @param page - page name
     * @return Authentication page
     */
    @RequestMapping(value = "/auth/{page}")
    public String auth(@PathVariable String page) {
    	logger.info("auth/" + page);
    	return "auth/" + page;
    }
    
    /** 
     * @param page - page name
     * @return Usern page
     */
    @RequestMapping(value = "/user/{page}")
    public String user(@PathVariable String page, Principal principal) {
    	User activeUser = (User) ((Authentication) principal).getPrincipal();
    	logger.info("user/" + page);
    	return "user/" + page;
    }
}