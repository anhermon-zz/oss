package org.openSourceSeeker.validation;

/**
 * Exceptions thrown when attempting to insert record with email that already exists
 * @author eugenp
 * @See <a href="https://github.com/eugenp/tutorials">github</a>
 */
@SuppressWarnings("serial")
public class EmailExistsException extends Throwable {

    public EmailExistsException(String message) {
        super(message);
    }
}