package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.User;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String userId;
    private String email;
    private String password;
    private String name;
    private Integer age;
    public User toEntity() {
        return new User( userId, email, password, name, age );
    }
}
