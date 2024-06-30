package com.awb.digital.center.authentification_service.service;

import com.awb.digital.center.authentification_service.dto.UserDto;
import com.awb.digital.center.authentification_service.entity.User;
import com.awb.digital.center.authentification_service.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private UserRepository repository;

    private ModelMapper modelMapper;

    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = repository.save(user);
         return modelMapper.map(savedUser, UserDto.class);
    }
}
