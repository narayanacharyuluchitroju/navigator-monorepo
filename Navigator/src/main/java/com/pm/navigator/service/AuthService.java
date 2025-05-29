package com.pm.navigator.service;


import com.pm.navigator.models.User;
import com.pm.navigator.repositopry.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User register(User user) throws Exception {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public Optional<User> login(String email, String rawPassword) {
        Optional<User> user = userRepo.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(rawPassword, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }
}
