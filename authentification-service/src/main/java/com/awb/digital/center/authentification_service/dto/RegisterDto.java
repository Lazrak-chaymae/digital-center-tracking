package com.awb.digital.center.authentification_service.dto;


import com.awb.digital.center.authentification_service.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {

    private String name;
    private String username;
    private String email;
    private String password;
    private String roleName;
    private String domainName;
}
