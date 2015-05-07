package org.openSourceSeeker.controller;

import java.security.Principal;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.log4j.Logger;
import org.openSourceSeeker.persistence.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * User REST API
 * @author Angel Hermon
 *
 */
@RestController
@RequestMapping(value = "/api")
public class UserController {
	
	@Autowired
	private UserService us;
	
	private static final Logger logger = Logger.getLogger(UserController.class);
	
	//PRIVATE APIs
	@Secured("USER")
	@RequestMapping(value = "/user" , method = RequestMethod.GET)
	public Response getUserProfile(Principal principal){
		User activeUser = (User) ((Authentication) principal).getPrincipal();
		logger.info("Request by:" + activeUser);
		try{
			return Response.ok()./*entity(upd.getById(1)).*/build(); //In case property was inserted successfully return HTTP 200
		}catch(Exception e){
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).build(); // In case of exception return HTTP 500
		}
	}
	

}
