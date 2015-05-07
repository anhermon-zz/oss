package org.openSourceSeeker.persistence.service;

import org.openSourceSeeker.persistence.model.PasswordResetToken;
import org.openSourceSeeker.persistence.model.User;
import org.openSourceSeeker.persistence.model.VerificationToken;
import org.openSourceSeeker.validation.EmailExistsException;

public interface UserService {

    User registerNewUserAccount(UserDto accountDto) throws EmailExistsException;

    User getUser(String verificationToken);

    void saveRegisteredUser(User user);

    void deleteUser(User user);

    void createVerificationTokenForUser(User user, String token);

    VerificationToken getVerificationToken(String VerificationToken);

    VerificationToken generateNewVerificationToken(String token);

    void createPasswordResetTokenForUser(User user, String token);

    User findUserByEmail(String email);

    PasswordResetToken getPasswordResetToken(String token);

    User getUserByPasswordResetToken(String token);

    User getUserByID(long id);

    void changeUserPassword(User user, String password);

    boolean checkIfValidOldPassword(User user, String password);
}