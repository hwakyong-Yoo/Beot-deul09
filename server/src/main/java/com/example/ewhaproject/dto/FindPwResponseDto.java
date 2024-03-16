package com.example.ewhaproject.dto;

import lombok.*;

@Data
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindPwResponseDto {

    private String email;
    private String mailTitle;
    private String mailContent;

}