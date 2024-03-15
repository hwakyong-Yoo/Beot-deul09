package com.example.ewhaproject.entity;

import com.example.ewhaproject.dto.UserDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
@Setter
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
    private String age;

    public void updateFromDto(UserDto userDto) { //회원 정보 수정
        this.setPassword(userDto.getPassword());
        this.setName(userDto.getName());
    }
}
