package org.openSourceSeeker.persistence.dao;

import org.openSourceSeeker.persistence.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);
	
	public void delete(User user);
}
