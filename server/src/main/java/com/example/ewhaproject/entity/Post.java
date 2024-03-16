package com.example.ewhaproject.entity;

import com.example.ewhaproject.dto.PostDto;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
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
    private String img;
    @Column
    private String explanation;     // 내용 (텍스트)
    @Column
    private String size_img;
    @Column
    private String answer1;
    @Column
    private String answer2;
    @Column
    private String answer3;
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

    public void updateDate(String currentFormattedDate) { this.date = currentFormattedDate; }

    public void update(String explanation, String answer1, String answer2, String answer3, double price, String deadline) {
        this.explanation = explanation;
        this.answer1= answer1;
        this.answer2=answer2;
        this.answer3= answer3;
        this.price=price;
        this.deadline=deadline;
    }
    public void close() { this.status = false;}
}
