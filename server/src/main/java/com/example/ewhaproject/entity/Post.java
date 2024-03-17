package com.example.ewhaproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(
            mappedBy = "post",
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            orphanRemoval = true
    )
    private List<Photo> photo = new ArrayList<>();

    public void updateDate(String currentFormattedDate) { this.date = currentFormattedDate; }
    public void close() { this.status = false;}

    public void update(String product, String explanation) {
        this.product = product;
        this.explanation = explanation;
    }

    // Post에서 파일 처리 위함
    public void addPhoto(Photo photo) {
        this.photo.add(photo);

        // 게시글에 파일이 저장되어있지 않은 경우
        if(photo.getPost() != this)
            // 파일 저장
            photo.setPost(this);
    }

    @Builder
    public Post(User user, String product, String explanation) {
        this.userId = user.getUserId();
        this.product = product;
        this.explanation = explanation;
    }
}
