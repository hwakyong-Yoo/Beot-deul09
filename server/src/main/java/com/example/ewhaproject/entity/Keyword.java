package com.example.ewhaproject.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@ToString
@Entity
@Getter
@Table(name="TB_KEYWORD")
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyword_id")
    private Long id;

    @Column(nullable = false)
    private String keyword;
    @Builder
    public Keyword(String keyword) {
        this.keyword = keyword;
    }
}
