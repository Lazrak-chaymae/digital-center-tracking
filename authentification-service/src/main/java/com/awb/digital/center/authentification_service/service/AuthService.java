package com.awb.digital.center.authentification_service.service;

import com.awb.digital.center.authentification_service.dto.LoginDto;

public interface AuthService {
    String login(LoginDto loginDto);
}
