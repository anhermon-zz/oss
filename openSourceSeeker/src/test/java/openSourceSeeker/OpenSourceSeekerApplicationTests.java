package openSourceSeeker;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.openSourceSeeker.OpenSourceSeekerApplication;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = OpenSourceSeekerApplication.class)
@WebAppConfiguration
public class OpenSourceSeekerApplicationTests {

	@Test
	public void contextLoads() {
	}

}
