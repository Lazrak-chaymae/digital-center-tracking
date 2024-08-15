package com.awb.digital.center.authentification_service.service;

import com.awb.digital.center.authentification_service.dto.*;

import java.util.List;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    List<RoleDto> getAllRoles();
    List<DomainDto> getAllDomains();
}
