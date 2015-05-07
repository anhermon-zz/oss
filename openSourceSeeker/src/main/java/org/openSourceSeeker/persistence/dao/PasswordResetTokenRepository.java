package org.openSourceSeeker.persistence.dao;

import org.openSourceSeeker.persistence.model.PasswordResetToken;
import org.openSourceSeeker.persistence.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author eugenp
 * @See <a href="https://github.com/eugenp/tutorials">github</a>
 */
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    public PasswordResetToken findByToken(String token);

    public PasswordResetToken findByUser(User user);
}
