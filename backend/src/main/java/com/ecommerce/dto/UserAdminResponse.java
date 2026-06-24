package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserAdminResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private boolean enabled;
    private List<String> roles;
    private LocalDateTime createdAt;
}
