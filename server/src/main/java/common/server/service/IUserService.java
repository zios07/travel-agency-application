package common.server.service;

import common.server.domain.User;
import common.server.exception.NotFoundException;
import common.server.exception.ServiceException;

import java.util.List;

public interface IUserService {
	
	User addUser(User user) throws ServiceException;

	User findUser(long id) throws NotFoundException;

	List<User> findAllUsers();

	void deleteUser(long id) throws NotFoundException;

	User updateUser(User user) throws NotFoundException;
	
	User getConnectedUser() throws NotFoundException;

    User findUserByEmail(String username) throws NotFoundException;
}
