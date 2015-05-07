package org.openSourceSeeker.config;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.thymeleaf.extras.springsecurity3.dialect.SpringSecurityDialect;
import org.thymeleaf.spring4.resourceresolver.SpringResourceResourceResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.TemplateResolver;


/**
 * Web Configuration.
 * @author Angel Hermon
 *
 */
@Configuration
@PropertySource("classpath:/conf/db.properties")
public class WebConfig {
	private static final Logger logger = Logger.getLogger(WebConfig.class);
	
	@Autowired
	private ThymeleafProperties properties;
	
	@Bean
	public SpringSecurityDialect conditionalCommentDialect() {
	    return new SpringSecurityDialect();
	}
	
	@Bean
	public ITemplateResolver defaultTemplateResolver() {
		TemplateResolver resolver = new TemplateResolver();
		resolver.setResourceResolver(thymeleafResourceResolver());
		resolver.setPrefix(this.properties.getPrefix());
		resolver.setSuffix(this.properties.getSuffix());
		resolver.setTemplateMode(this.properties.getMode());
		resolver.setCharacterEncoding(this.properties.getEncoding());
		resolver.setCacheable(false);
		return resolver;
	}
	
	@Bean
	public SpringResourceResourceResolver thymeleafResourceResolver() {
		return new SpringResourceResourceResolver();
	}
}
