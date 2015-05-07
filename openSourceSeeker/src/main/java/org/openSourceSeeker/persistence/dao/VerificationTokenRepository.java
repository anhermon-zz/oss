package org.openSourceSeeker.persistence.dao;

import org.openSourceSeeker.persistence.model.User;
import org.openSourceSeeker.persistence.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

    public VerificationToken findByToken(String token);

    public VerificationToken findByUser(User user);
}