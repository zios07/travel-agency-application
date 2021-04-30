package common.server.service;

import common.server.domain.User;
import common.server.exception.BadCredentialsException;
import common.server.exception.NotFoundException;

public interface IAuthenticationService {

	User authenticate(User user) throws NotFoundException, BadCredentialsException;
}
