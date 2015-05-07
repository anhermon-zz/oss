package org.openSourceSeeker.config.security;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Security Configuration
 * 
 * @author Angel Hermon
 *
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	private static final Logger logger = Logger.getLogger(SecurityConfig.class);
	
	@Autowired
	private DataSource dataSource;
	
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth  
        	  .jdbcAuthentication().dataSource(dataSource).passwordEncoder(passwordEncoder())
//        	  .withUser("Angel").password(passwordEncoder().encode("FLASHback880")).roles("ADMIN")
        	  ;
    }
    
    @Override
    public void configure(WebSecurity web) throws Exception {
      web.ignoring()
           .antMatchers("/public/**"); //
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	configureCsrf(http)
        .authorizeRequests()
        .antMatchers("/",
        		       "/partials/**",
        		       "/css/**",
        		       "/js/**",
        		       "/img/**",
        		       "/fonts/**",
        		       "/auth/**",
        		       "/api/public/**").permitAll() // pages that does not require authentication TODO:add registration page
          
          .antMatchers("/admin/**").hasRole("ADMIN")  //access by role
          
          .anyRequest().authenticated()
       
          .and()
       		.formLogin()  
       			.loginPage("/auth/login").permitAll()//set login pages
       
       .and()
       		.logout().logoutRequestMatcher(new AntPathRequestMatcher("/auth/logout"))
       		.permitAll() //set logout page 
       .and()
       		.logout().logoutSuccessUrl("/") // logout success page
       	.and().exceptionHandling().accessDeniedPage("/error/403");
    }

	private HttpSecurity configureCsrf(HttpSecurity http) throws Exception {
		final HttpSessionCsrfTokenRepository tokenRepository = new HttpSessionCsrfTokenRepository();
    	tokenRepository.setHeaderName("X-XSRF-TOKEN");
    	http.csrf().csrfTokenRepository(tokenRepository); 
    	return http;
	}
   
    @Bean
    public RoleHierarchy roleHierarchy(){
    	RoleHierarchyImpl rhi = new RoleHierarchyImpl();
    	rhi.setHierarchy("ADMIN > STAFF > USER");
    	return rhi;
    }
    

   @Bean 
   public static BCryptPasswordEncoder passwordEncoder() throws Exception {  
       return new BCryptPasswordEncoder();  
   }  
}