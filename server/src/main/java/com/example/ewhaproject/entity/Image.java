package com.example.ewhaproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "TB_IMAGE")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyword_id")
    private Long id;
    @Column
    private String post_id;
    @Column
    private String original_name;
    @Column
    private String save_name;
}