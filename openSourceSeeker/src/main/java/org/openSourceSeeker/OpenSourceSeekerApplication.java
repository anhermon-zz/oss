package org.openSourceSeeker;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OpenSourceSeekerApplication {

    public static void main(String[] args) {
    	Logger.getRootLogger().setLevel(Level.DEBUG);
        SpringApplication.run(OpenSourceSeekerApplication.class, args);
    }
    

}
