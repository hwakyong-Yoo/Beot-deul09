package com.example.ewhaproject.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
@Setter
@Table(name="TB_POST")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    @Column
    private String userId;
    @Column
    private String product;
    @Column
    private String keyword;
    @Column
    private String img;
    @Column
    private String explanation;     // 내용 (텍스트)
    @Column
    private String size_img;
    @Column
    private String qna;
    @Column
    private int min_participants;
    @Column
    private double price;
    @Column
    private String date;     // 작성일
    @Column
    private String deadline;
    @Column
    private String status;   // 이미지 업로드 URL
    @Column
    private String account_num;
    @Column
    private String account_holder;

}
