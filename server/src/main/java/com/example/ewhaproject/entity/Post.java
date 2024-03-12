package com.example.ewhaproject.entity;

import com.example.ewhaproject.dto.PostDto;
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

    @ManyToOne
    @JoinColumn(name = "userId", nullable = true) // 외래 키 생성, User 엔터티의 기본 키(userId)와 매핑
    private User user;

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
    private String date;     // 마감 기한
    @Column
    private String status;   // 이미지 업로드 URL
    @Column
    private String account_num;
    @Column
    private String account_holder;

    public Post(Long postId, String name, String keyword, String img, String explanation, String sizeImg, String qna, int minParticipants, double price, String date, String status, String accountNum, String accountHolder) {
    }
}
