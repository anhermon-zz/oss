package org.openSourceSeeker.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class ApplicationConfig {
	
	@Autowired
    Environment env;

	/**
	 * DB configs 
	 */
	@Bean
	@Qualifier("users")
	public DataSource usersDataSource(){
		BasicDataSource bds = new BasicDataSource();
		bds.setUsername(env.getProperty("jdbc.users.user"));
		bds.setPassword(env.getProperty("jdbc.users.password"));
		bds.setUrl(env.getProperty("jdbc.users.url"));
		bds.setDriverClassName(env.getProperty("jdbc.users.deiverClassName"));
		return bds;
	}
}
