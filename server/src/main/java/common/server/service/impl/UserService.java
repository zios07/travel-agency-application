package common.server.service.impl;

import common.server.domain.User;
import common.server.exception.NotFoundException;
import common.server.exception.ServiceException;
import common.server.repository.UserRepository;
import common.server.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public User addUser(User user) throws ServiceException {
        if (user.getEmail() != null)
            if (userRepository.findByEmail(user.getEmail()) != null) {
                throw new ServiceException("USERNAME.ALREADY.EXISTS", "Email already exists");
            }
        if (userRepository.count() == 0) {
            user.setRole("ADMIN");
        } else {
            if (user.getRole() == null) {
                user.setRole("USER");
            }
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User findUser(long id) throws NotFoundException {
        if (!userRepository.existsById(id))
            throw new NotFoundException("USER.NOT.FOUND", "No user found with id: " + id);
        return userRepository.findById(id).get();
    }

    @Override
    public List<User> findAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> {
            user.setPassword(null);
        });
        return users;
    }

    @Override
    public void deleteUser(long id) throws NotFoundException {
        if (!userRepository.existsById(id))
            throw new NotFoundException("USER.NOT.FOUND", "No user found with id: " + id);
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(User user) throws NotFoundException {
        if (!userRepository.existsById(user.getId()))
            throw new NotFoundException("USER.NOT.FOUND", "No user found with id: " + user.getId());
        return userRepository.save(user);
    }

    @Override
    public User findUserByEmail(String email) throws NotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null)
            throw new NotFoundException("USER.NOT.FOUND", "No user found with email: " + email);
        return user;
    }

    @Override
    public User getConnectedUser() throws NotFoundException {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.findUserByEmail(email);

    }

}
