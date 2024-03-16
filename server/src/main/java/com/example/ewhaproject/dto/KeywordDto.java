package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Keyword;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KeywordDto {
    private String keyword;

    public Keyword toEntity() {
        return new Keyword( keyword );
    }
}
