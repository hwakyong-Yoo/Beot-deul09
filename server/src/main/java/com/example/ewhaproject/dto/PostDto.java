package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Post;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Long postId;
    private String userId;
    private String product;
    private String keyword;
    private String img;
    private String explanation;     // 내용 (텍스트)
    private String size_img;
    private String qna;
    private int min_participants;
    private double price;
    private String date; //작성일
    private String deadline;
    private String status;
    private String account_num;
    private String account_holder;

    public static String getCurrentFormattedDate() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }

    public static PostDto createdPostDto(Post createdPost) {
        return PostDto.builder()
                .postId(createdPost.getPostId())
                .userId(createdPost.getUserId())
                .product(createdPost.getProduct())
                .keyword(createdPost.getKeyword())
                .img(createdPost.getImg())
                .explanation(createdPost.getExplanation())
                .size_img(createdPost.getSize_img())
                .qna(createdPost.getQna())
                .min_participants(createdPost.getMin_participants())
                .price(createdPost.getPrice())
                .date(createdPost.getDate())
                .deadline(createdPost.getDeadline())
                .status(createdPost.getStatus())
                .account_num(createdPost.getAccount_num())
                .account_holder(createdPost.getAccount_holder())
                .build();
    }

    public Post toEntity() {
        return new Post(
                postId,
                userId,
                product,
                keyword,
                img,
                explanation,
                size_img,
                qna,
                min_participants,
                price,
                date,
                deadline,
                status,
                account_num,
                account_holder
        );
    }
}
