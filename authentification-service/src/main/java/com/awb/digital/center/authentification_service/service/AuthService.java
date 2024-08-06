package com.awb.digital.center.authentification_service.service;

import com.awb.digital.center.authentification_service.dto.JwtAuthResponse;
import com.awb.digital.center.authentification_service.dto.LoginDto;
import com.awb.digital.center.authentification_service.dto.RegisterDto;
import com.awb.digital.center.authentification_service.dto.RoleDto;
import com.awb.digital.center.authentification_service.entity.Role;

import java.util.List;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    List<RoleDto> getAllRoles();

}
