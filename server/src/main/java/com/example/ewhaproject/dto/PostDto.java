package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.entity.User;
import lombok.*;

@Data
@Builder
public class PostDto {
    private Long postId;
    private String userID;
    private String name;
    private String keyword;
    private String img;
    private String explanation;     // 내용 (텍스트)
    private String size_img;
    private String qna;
    private int min_participants;
    private double price;
    private String date;     // 마감 기한
    private String status;
    private String account_num;
    private String account_holder;

    public static PostDto createPostDto(Post createdPost) {
        return PostDto.builder()
                .postId(createdPost.getPostId())
                .userID(createdPost.getUser().getUserId())
                .name(createdPost.getUser().getName())
                .keyword(createdPost.getKeyword())
                .img(createdPost.getImg())
                .explanation(createdPost.getExplanation())
                .size_img(createdPost.getSize_img())
                .qna(createdPost.getQna())
                .min_participants(createdPost.getMin_participants())
                .price(createdPost.getPrice())
                .date(createdPost.getDate())  // 날짜 형식에 따라 수정해야 할 수 있음
                .status(createdPost.getStatus())
                .account_num(createdPost.getAccount_num())
                .account_holder(createdPost.getAccount_holder())
                .build();
    }

    public Post toEntity(User user) {
        return new Post(
                postId,
                user,
                keyword,
                img,
                explanation,
                size_img,
                qna,
                min_participants,
                price,
                date,
                status,
                account_num,
                account_holder
        );
    }
}
