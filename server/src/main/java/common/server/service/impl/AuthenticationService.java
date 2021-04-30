package common.server.service.impl;

import common.server.domain.User;
import common.server.exception.BadCredentialsException;
import common.server.exception.NotFoundException;
import common.server.repository.UserRepository;
import common.server.service.IAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements IAuthenticationService {

	@Autowired 
	private UserRepository userRepository;
	
	@Override
	public User authenticate(User user) throws NotFoundException, BadCredentialsException {
		User account = userRepository.findByEmail(user.getEmail());
		if(account == null || (account.getPassword() != null && !account.getPassword().equals(user.getPassword())))
			throw new BadCredentialsException("AUTHENTICATION.ERROR", "Bad credentials");
		return account;
	}

}
