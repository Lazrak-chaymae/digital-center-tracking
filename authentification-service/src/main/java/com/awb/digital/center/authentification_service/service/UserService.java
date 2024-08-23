package com.awb.digital.center.authentification_service.service;

import com.awb.digital.center.authentification_service.dto.ChangePasswordDto;
import com.awb.digital.center.authentification_service.dto.UserDto;
import com.awb.digital.center.authentification_service.entity.User;

import java.util.List;

public interface UserService {

    void updateUserPassword(ChangePasswordDto changePasswordDto);
    List<UserDto> getUsersByDomainId(Long domainId);
}
