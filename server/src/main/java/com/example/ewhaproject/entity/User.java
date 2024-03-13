package com.example.ewhaproject.entity;

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
    private String password;

    @Column
    private String name;

}
