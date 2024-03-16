package com.example.ewhaproject.dto;

import lombok.*;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FindPwRequestDto {

    private String name;
    private String email;

}