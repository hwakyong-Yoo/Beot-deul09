package com.example.ewhaproject.entity;

import com.example.ewhaproject.dto.UserDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@NoArgsConstructor
@ToString
@Entity
@Getter
@Table(name="TB_USER")
public class User {
    @Id
    @Column(name = "userId")
    private String userId;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private Integer age;

    @Builder
    public User(String userId, String email, String password, String name, Integer age) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.age = age;
    }


    public void updateFromDto(UserDto userDto) { //회원 정보 수정
        this.password = userDto.getPassword();
        this.name = userDto.getName();
    }

    public void setTemporaryPassword(String hashedTempPassword) {
        this.password = hashedTempPassword;
    }
}
