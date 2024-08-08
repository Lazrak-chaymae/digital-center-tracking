package com.awb.digital.center.authentification_service.service;

import com.awb.digital.center.authentification_service.dto.JwtAuthResponse;
import com.awb.digital.center.authentification_service.dto.LoginDto;
import com.awb.digital.center.authentification_service.dto.RegisterDto;
import com.awb.digital.center.authentification_service.dto.RoleDto;
import com.awb.digital.center.authentification_service.entity.Role;
import com.awb.digital.center.authentification_service.entity.User;
import com.awb.digital.center.authentification_service.exception.UserAPIException;
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
public class AuthServiceImpl implements AuthService{

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager ;
    private JwtTokenProvider jwtTokenProvider;
    private ModelMapper mapper;


    @Override
    public String register(RegisterDto registerDto) {

        //check if email is already exists
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new UserAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!");
        }
        User user = new User();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        Role userRole = roleRepository.findByName(registerDto.getRoleName());
        user.setRole(userRole);
        userRepository.save(user);

        return "User Registered Successfully!.";
    }


    @Override
    public List<RoleDto> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return roles.stream()
                .map((role -> mapper.map(role, RoleDto.class)))
                .collect(Collectors.toList());
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(),
                loginDto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        String role = null;
        String name = null;
        Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());
        if(userOptional.isPresent()){
            User loggedInUser = userOptional.get();
            name = loggedInUser.getName();
            Optional<Role> optionalRole = Optional.ofNullable(loggedInUser.getRole());
            if(optionalRole.isPresent()){
                Role userRole = optionalRole.get();
                role = userRole.getName();
            }
        }

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setName(name);

        return jwtAuthResponse;
    }
}
