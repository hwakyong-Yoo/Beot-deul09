package com.example.ewhaproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
    @ElementCollection
    @Column(name = "keyword")
    private List<String> keywords;
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
    private String deadline; //마감 기한
    @Column
    private String chatroom_link; //오픈채팅방 링크
    @Column
    private Boolean status = true; //게시물 작성시 기본 값으로 진행중
    @Column
    private String account_num;
    @Column
    private String account_holder;

}
