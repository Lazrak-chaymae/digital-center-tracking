package com.awb.digital.center.authentification_service.service;

import com.awb.digital.center.authentification_service.dto.*;
import com.awb.digital.center.authentification_service.entity.Domain;
import com.awb.digital.center.authentification_service.entity.Role;
import com.awb.digital.center.authentification_service.entity.User;
import com.awb.digital.center.authentification_service.exception.UserAPIException;
import com.awb.digital.center.authentification_service.repository.DomainRepository;
import com.awb.digital.center.authentification_service.repository.RoleRepository;
import com.awb.digital.center.authentification_service.repository.UserRepository;
import com.awb.digital.center.authentification_service.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private ModelMapper mapper;
    private DomainRepository domainRepository;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;


    @Override
    public void updateUserPassword(ChangePasswordDto changePasswordDto) {
        User user = userRepository.findByEmail(changePasswordDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(changePasswordDto.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public List<UserDto> getUsersByDomainId(Long domainId) {
        Domain domain = domainRepository.findById(domainId).orElseThrow(() -> new RuntimeException("Domain not found"));
        List<User> users = userRepository.findAllByDomain(domain);
        return users.stream().map((user -> mapper.map(user, UserDto.class))).collect(Collectors.toList());
    }
}
