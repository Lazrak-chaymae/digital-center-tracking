package com.awb.digital.center.authentification_service.service;

import com.awb.digital.center.authentification_service.dto.ChangePasswordDto;

public interface UserService {

    void updateUserPassword(ChangePasswordDto changePasswordDto);
}
